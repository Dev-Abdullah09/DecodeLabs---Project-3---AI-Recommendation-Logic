"""
AutoMatch AI Recommendation Engine.
DecodeLabs Artificial Intelligence - Project 3: AI Recommendation Logic.
Author: Abdullah Zafar (Batch 2026).

Implements transparent hybrid algorithmic recommendation logic:
- User Preference Profiling
- Exact & Partial Categorical Matching
- Normalized Numerical Distance Similarity
- Dynamic Priority Weight Adjustment
- Multi-Criteria Scoring & Ranking
- Explainable AI Reasoning Generation
"""

import os
from typing import List, Dict, Any, Optional, Tuple

from utils.preprocessing import preprocess_dataset, compute_dataset_statistics
from utils.scoring import (
    DEFAULT_WEIGHTS,
    PRIORITY_WEIGHT_PROFILES,
    calculate_categorical_similarity,
    calculate_numerical_similarity,
    calculate_budget_score,
    calculate_mileage_score,
    calculate_horsepower_score,
    calculate_seats_score,
)


class CarRecommendationEngine:
    """
    Transparent Hybrid Recommendation Engine for automotive matchmaking.
    """

    def __init__(self, data_path: Optional[str] = None):
        self.data_path = data_path or os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "data",
            "cars.csv"
        )
        self.cars: List[Dict[str, Any]] = []
        self.stats: Dict[str, Any] = {}
        self.load_and_prepare_data()

    def load_and_prepare_data(self) -> None:
        """Loads and preprocesses the dataset."""
        try:
            self.cars = preprocess_dataset(self.data_path)
            self.stats = compute_dataset_statistics(self.cars)
        except Exception as e:
            print(f"Warning: Could not load dataset from {self.data_path}: {e}")
            self.cars = []
            self.stats = {}

    def get_priority_weights(self, priority: Optional[str]) -> Dict[str, float]:
        """
        Dynamically adjusts feature weights based on user-selected priority.
        """
        if not priority or priority not in PRIORITY_WEIGHT_PROFILES:
            return dict(DEFAULT_WEIGHTS)
        return dict(PRIORITY_WEIGHT_PROFILES[priority])

    def score_single_car(
        self, car: Dict[str, Any], preferences: Dict[str, Any], weights: Dict[str, float]
    ) -> Tuple[float, Dict[str, float]]:
        """
        Calculates individual feature similarities and final weighted score (0.0 - 1.0)
        for a single vehicle against the user's preference profile.
        """
        feature_scores: Dict[str, float] = {}

        # 1. Budget Score
        min_b = preferences.get("min_budget")
        max_b = preferences.get("max_budget")
        feature_scores["budget"] = calculate_budget_score(car["price"], min_b, max_b)

        # 2. Brand Match
        feature_scores["brand"] = calculate_categorical_similarity(
            car["brand"], preferences.get("brand")
        )

        # 3. Body Type Match
        feature_scores["body_type"] = calculate_categorical_similarity(
            car["body_type"], preferences.get("body_type")
        )

        # 4. Fuel Type Match
        feature_scores["fuel_type"] = calculate_categorical_similarity(
            car["fuel_type"], preferences.get("fuel_type")
        )

        # 5. Transmission Match
        feature_scores["transmission"] = calculate_categorical_similarity(
            car["transmission"], preferences.get("transmission")
        )

        # 6. Mileage Score
        feature_scores["mileage"] = calculate_mileage_score(
            car["mileage"], preferences.get("max_mileage")
        )

        # 7. Engine Size Similarity (Acceptable range +/- 1500cc)
        pref_engine = preferences.get("engine_cc")
        feature_scores["engine"] = calculate_numerical_similarity(
            car["engine_cc"], pref_engine, acceptable_range=1800.0
        )

        # 8. Horsepower Score
        pref_hp = preferences.get("min_horsepower")
        feature_scores["horsepower"] = calculate_horsepower_score(
            car["horsepower"], pref_hp
        )

        # 9. Seating Capacity Score
        pref_seats = preferences.get("seats")
        feature_scores["seats"] = calculate_seats_score(
            car["seats"], pref_seats
        )

        # 10. Drive Type Match
        feature_scores["drive_type"] = calculate_categorical_similarity(
            car["drive_type"], preferences.get("drive_type")
        )

        # 11. Usage / Purpose Match
        feature_scores["usage"] = calculate_categorical_similarity(
            car["usage"], preferences.get("usage")
        )

        # Compute weighted sum
        total_score = 0.0
        weight_sum = 0.0

        for feature, weight in weights.items():
            if feature in feature_scores:
                total_score += feature_scores[feature] * weight
                weight_sum += weight

        final_normalized_score = total_score / max(weight_sum, 1e-6)
        # Clamped strictly between 0.0 and 1.0
        final_normalized_score = max(0.0, min(1.0, final_normalized_score))

        return final_normalized_score, feature_scores

    def generate_explanation(
        self,
        car: Dict[str, Any],
        preferences: Dict[str, Any],
        feature_scores: Dict[str, float],
        final_score_pct: int
    ) -> List[str]:
        """
        Generates clear, human-interpretable reasoning bullets explaining
        why this specific vehicle matches the user's preference profile.
        """
        reasons: List[str] = []

        # Budget explanation
        b_score = feature_scores.get("budget", 0.0)
        max_b = preferences.get("max_budget")
        if b_score >= 0.95:
            if max_b:
                reasons.append(f"Comfortably within budget at ${car['price']:,} (Max: ${max_b:,})")
            else:
                reasons.append(f"Excellent value proposition at ${car['price']:,}")
        elif b_score >= 0.70:
            reasons.append(f"Near target budget at ${car['price']:,} with strong feature value")

        # Body Type
        if feature_scores.get("body_type", 0.0) >= 0.99 and preferences.get("body_type") and preferences.get("body_type").lower() != "any":
            reasons.append(f"Exact match for preferred {car['body_type']} body style")

        # Fuel Type
        if feature_scores.get("fuel_type", 0.0) >= 0.99 and preferences.get("fuel_type") and preferences.get("fuel_type").lower() != "any":
            reasons.append(f"Matches preferred {car['fuel_type']} powertrain ({car['fuel_economy']} MPG rating)")

        # Transmission
        if feature_scores.get("transmission", 0.0) >= 0.99 and preferences.get("transmission") and preferences.get("transmission").lower() != "any":
            reasons.append(f"Equipped with preferred {car['transmission']} transmission")

        # Brand
        if feature_scores.get("brand", 0.0) >= 0.99 and preferences.get("brand") and preferences.get("brand").lower() != "any":
            reasons.append(f"Exact brand match: {car['brand']} (Reliability rating: {car['reliability_score']}/10)")

        # Seats
        if feature_scores.get("seats", 0.0) >= 0.95 and preferences.get("seats"):
            reasons.append(f"Provides required {car['seats']}-passenger seating capacity")

        # Horsepower
        if feature_scores.get("horsepower", 0.0) >= 0.95 and preferences.get("min_horsepower"):
            reasons.append(f"Delivers impressive {car['horsepower']} HP output exceeding requirement")

        # Drive type
        if feature_scores.get("drive_type", 0.0) >= 0.90 and preferences.get("drive_type") and preferences.get("drive_type").lower() != "any":
            reasons.append(f"Fitted with desired {car['drive_type']} drivetrain")

        # Usage
        if feature_scores.get("usage", 0.0) >= 0.90 and preferences.get("usage") and preferences.get("usage").lower() != "any":
            reasons.append(f"Tailored specifically for {car['usage']} driving scenarios")

        # Fallback if few specific criteria matched
        if len(reasons) < 2:
            reasons.append(f"High overall compatibility score of {final_score_pct}%")
            reasons.append(f"Strong reliability index of {car['reliability_score']}/10 and {car['fuel_economy']} MPG efficiency")

        return reasons

    def recommend_cars(
        self, preferences: Dict[str, Any], top_n: int = 5
    ) -> Dict[str, Any]:
        """
        Executes the full recommendation pipeline:
        1. Validate & Parse User Input
        2. Compute Dynamic Priority Weights
        3. Score All Eligible Vehicles
        4. Sort & Rank by Score DESC
        5. Generate Interpretability Explanations
        6. Return Top-N Recommended Vehicles + Diagnostic Metadata
        """
        if not self.cars:
            self.load_and_prepare_data()

        if not self.cars:
            return {
                "success": False,
                "error": "Car dataset is empty or unavailable.",
                "recommendations": [],
                "meta": {}
            }

        priority = preferences.get("priority", "Budget")
        weights = self.get_priority_weights(priority)

        scored_cars = []
        for car in self.cars:
            score, f_scores = self.score_single_car(car, preferences, weights)
            score_pct = round(score * 100, 1)

            # Generate breakdown percentages
            breakdown_pct = {k: round(v * 100, 1) for k, v in f_scores.items()}

            explanation = self.generate_explanation(
                car, preferences, f_scores, int(score_pct)
            )

            scored_item = {
                **car,
                "compatibility_score": score_pct,
                "score_decimal": round(score, 4),
                "feature_scores": breakdown_pct,
                "explanation": explanation,
                "matched_priority": priority
            }
            scored_cars.append(scored_item)

        # Sort by compatibility score DESC, secondary tie-break on price (lower price wins for same score)
        scored_cars.sort(
            key=lambda x: (x["compatibility_score"], -x["price"], x["rating"]),
            reverse=True
        )

        top_recommendations = scored_cars[:top_n]

        # Diagnostics & Evaluation summary for this query
        all_scores = [c["compatibility_score"] for c in scored_cars]
        avg_score = round(sum(all_scores) / len(all_scores), 1) if all_scores else 0
        best_score = top_recommendations[0]["compatibility_score"] if top_recommendations else 0

        return {
            "success": True,
            "preferences": preferences,
            "applied_weights": {k: round(v * 100, 1) for k, v in weights.items()},
            "recommendations": top_recommendations,
            "meta": {
                "total_cars_evaluated": len(self.cars),
                "top_n": top_n,
                "best_match_score": best_score,
                "average_score": avg_score,
                "priority_applied": priority
            }
        }
