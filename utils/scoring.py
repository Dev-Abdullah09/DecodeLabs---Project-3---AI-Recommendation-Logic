"""
Mathematical Scoring & Similarity Functions for AutoMatch AI.
Implements exact matching, normalized difference similarity, budget penalty scoring,
and priority weight matrices.
"""

from typing import Dict, Any, Optional

# Base weight profile (default 100% total)
DEFAULT_WEIGHTS = {
    "budget": 0.20,
    "brand": 0.10,
    "body_type": 0.10,
    "fuel_type": 0.10,
    "transmission": 0.10,
    "mileage": 0.10,
    "engine": 0.05,
    "horsepower": 0.05,
    "seats": 0.05,
    "drive_type": 0.05,
    "usage": 0.10,
}

# Dynamic priority profiles that adjust weights according to user goal
PRIORITY_WEIGHT_PROFILES = {
    "Budget": {
        "budget": 0.35, "mileage": 0.15, "fuel_type": 0.12, "brand": 0.06,
        "body_type": 0.08, "transmission": 0.06, "engine": 0.03, "horsepower": 0.03,
        "seats": 0.04, "drive_type": 0.03, "usage": 0.05
    },
    "Performance": {
        "horsepower": 0.25, "engine": 0.15, "drive_type": 0.15, "budget": 0.12,
        "body_type": 0.10, "transmission": 0.08, "brand": 0.05, "mileage": 0.04,
        "usage": 0.04, "fuel_type": 0.02, "seats": 0.00
    },
    "Fuel Economy": {
        "fuel_type": 0.25, "mileage": 0.18, "budget": 0.20, "engine": 0.10,
        "body_type": 0.08, "transmission": 0.07, "usage": 0.06, "brand": 0.03,
        "horsepower": 0.01, "seats": 0.02, "drive_type": 0.00
    },
    "Family": {
        "seats": 0.25, "body_type": 0.20, "budget": 0.15, "usage": 0.15,
        "drive_type": 0.08, "fuel_type": 0.05, "transmission": 0.05, "mileage": 0.04,
        "brand": 0.03, "engine": 0.00, "horsepower": 0.00
    },
    "Luxury": {
        "brand": 0.25, "usage": 0.18, "body_type": 0.12, "budget": 0.12,
        "transmission": 0.10, "horsepower": 0.08, "drive_type": 0.06, "engine": 0.04,
        "mileage": 0.03, "seats": 0.02, "fuel_type": 0.00
    },
    "Reliability": {
        "brand": 0.25, "mileage": 0.20, "budget": 0.18, "transmission": 0.10,
        "fuel_type": 0.09, "body_type": 0.08, "usage": 0.05, "seats": 0.02,
        "engine": 0.01, "horsepower": 0.01, "drive_type": 0.01
    },
    "Comfort": {
        "body_type": 0.18, "seats": 0.16, "transmission": 0.14, "budget": 0.14,
        "brand": 0.12, "usage": 0.10, "drive_type": 0.06, "fuel_type": 0.05,
        "mileage": 0.03, "engine": 0.01, "horsepower": 0.01
    }
}


def calculate_categorical_similarity(car_val: str, pref_val: Optional[str]) -> float:
    """
    Computes exact and partial categorical similarity constrained between 0.0 and 1.0.
    If preference is 'Any' or empty, award full neutral match (1.0).
    """
    if not pref_val or pref_val.strip() == "" or pref_val.lower() == "any":
        return 1.0

    c_norm = str(car_val).strip().lower()
    p_norm = str(pref_val).strip().lower()

    if c_norm == p_norm:
        return 1.0

    # Partial similarity rules
    # Transmission: CVT vs Automatic
    if {c_norm, p_norm} == {"cvt", "automatic"}:
        return 0.85

    # Drive Type: AWD vs 4WD
    if {c_norm, p_norm} == {"awd", "4wd"}:
        return 0.90

    # Fuel Type: Hybrid vs Petrol
    if {c_norm, p_norm} == {"hybrid", "petrol"}:
        return 0.60

    # Body Type: Hatchback vs Wagon / Coupe vs Sedan
    if {c_norm, p_norm} == {"hatchback", "wagon"}:
        return 0.70
    if {c_norm, p_norm} == {"coupe", "sedan"}:
        return 0.50

    return 0.0


def calculate_numerical_similarity(car_val: float, pref_val: Optional[float], acceptable_range: float) -> float:
    """
    Computes normalized numerical similarity:
    similarity = max(0.0, 1.0 - abs(car_val - pref_val) / acceptable_range)
    Strictly prevents negative values.
    """
    if pref_val is None or acceptable_range <= 0:
        return 1.0

    diff = abs(float(car_val) - float(pref_val))
    score = 1.0 - (diff / float(acceptable_range))
    return max(0.0, min(1.0, score))


def calculate_budget_score(car_price: float, min_budget: Optional[float], max_budget: Optional[float]) -> float:
    """
    Calculates intelligent budget compatibility:
    - If inside [min_budget, max_budget]: 1.0 (perfect)
    - If below min_budget: generous score (saving money is great: 0.90 - 0.98)
    - If slightly above max_budget: soft linear decay (up to 15% stretch)
    - If far above max_budget: steep drop to 0.0
    """
    if max_budget is None or max_budget <= 0:
        return 1.0

    min_b = min_budget if (min_budget is not None and min_budget > 0) else 0.0
    max_b = max(max_budget, min_b)

    if min_b <= car_price <= max_b:
        # Perfectly within budget range
        # Slight bonus for being comfortably in the mid-range
        return 1.0

    if car_price < min_b:
        # Car is cheaper than minimum budget: very acceptable!
        saving_pct = (min_b - car_price) / max(min_b, 1.0)
        return max(0.80, 1.0 - (saving_pct * 0.20))

    if car_price > max_b:
        # Over budget
        over_pct = (car_price - max_b) / max_b
        if over_pct <= 0.10:  # Within 10% stretch
            return max(0.60, 1.0 - (over_pct * 3.5))
        elif over_pct <= 0.25:  # Within 25% stretch
            return max(0.20, 0.65 - (over_pct * 1.8))
        else:
            return max(0.0, 0.20 - (over_pct * 0.5))

    return 1.0


def calculate_mileage_score(car_mileage: float, max_mileage_pref: Optional[float]) -> float:
    """
    Lower mileage is always preferred.
    """
    if max_mileage_pref is None or max_mileage_pref <= 0:
        return 1.0

    if car_mileage <= max_mileage_pref:
        # Even better if lower than max preferred
        ratio = car_mileage / max(max_mileage_pref, 1.0)
        return max(0.85, 1.0 - (ratio * 0.15))
    else:
        over_ratio = (car_mileage - max_mileage_pref) / max_mileage_pref
        return max(0.0, 1.0 - over_ratio)


def calculate_horsepower_score(car_hp: float, min_hp_pref: Optional[float]) -> float:
    """
    Exceeding minimum horsepower is rewarded; falling below is penalized.
    """
    if min_hp_pref is None or min_hp_pref <= 0:
        return 1.0

    if car_hp >= min_hp_pref:
        return 1.0
    else:
        deficit = min_hp_pref - car_hp
        return max(0.0, 1.0 - (deficit / max(min_hp_pref, 50.0)))


def calculate_seats_score(car_seats: int, pref_seats: Optional[int]) -> float:
    """
    Exact seats match = 1.0. Having 1 extra seat is usually fine (0.85).
    Having fewer seats than required is penalized heavily.
    """
    if pref_seats is None or pref_seats <= 0:
        return 1.0

    if car_seats == pref_seats:
        return 1.0
    elif car_seats > pref_seats:
        diff = car_seats - pref_seats
        return max(0.70, 1.0 - (diff * 0.15))
    else:
        # Deficit in seating
        deficit = pref_seats - car_seats
        return max(0.0, 1.0 - (deficit * 0.45))
