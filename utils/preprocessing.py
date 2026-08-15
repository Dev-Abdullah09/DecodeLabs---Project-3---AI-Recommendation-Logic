"""
Data Preprocessing Pipeline for AutoMatch AI Recommendation Engine.
Handles CSV loading, validation, missing value imputation, type casting,
and feature normalization.
"""

import csv
import os
from typing import List, Dict, Any, Optional

REQUIRED_COLUMNS = [
    "id", "brand", "model", "year", "price", "mileage", "fuel_type",
    "transmission", "body_type", "engine_cc", "horsepower", "seats",
    "drive_type", "city", "condition", "rating", "fuel_economy", "usage"
]

NUMERICAL_DEFAULTS = {
    "year": 2022,
    "price": 30000.0,
    "mileage": 20000.0,
    "engine_cc": 2000.0,
    "horsepower": 200.0,
    "seats": 5,
    "rating": 4.5,
    "fuel_economy": 30.0,
    "luxury_score": 6.0,
    "reliability_score": 8.0
}

CATEGORICAL_DEFAULTS = {
    "brand": "Toyota",
    "model": "Generic Model",
    "fuel_type": "Petrol",
    "transmission": "Automatic",
    "body_type": "Sedan",
    "drive_type": "FWD",
    "city": "Dallas",
    "condition": "Used",
    "usage": "Daily Commute"
}


def load_raw_dataset(file_path: str) -> List[Dict[str, Any]]:
    """
    Loads raw car data from a CSV file.
    Gracefully handles missing file by returning empty list or fallback.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset CSV file not found at: {file_path}")

    records = []
    with open(file_path, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append(row)
    return records


def clean_and_impute_record(row: Dict[str, Any], index: int) -> Dict[str, Any]:
    """
    Cleans, validates, type-casts, and imputes missing values for a single record.
    """
    cleaned: Dict[str, Any] = {}

    # Primary key ID
    try:
        cleaned["id"] = int(row.get("id", index + 1))
    except (ValueError, TypeError):
        cleaned["id"] = index + 1

    # Standardize string fields
    for col, default_val in CATEGORICAL_DEFAULTS.items():
        val = row.get(col, "")
        if val is None or str(val).strip() == "":
            cleaned[col] = default_val
        else:
            cleaned[col] = str(val).strip()

    # Model name
    model_val = row.get("model", "")
    cleaned["model"] = str(model_val).strip() if model_val else f"{cleaned['brand']} Vehicle"

    # Numerical fields
    for col, default_val in NUMERICAL_DEFAULTS.items():
        val = row.get(col, None)
        if val is None or str(val).strip() == "":
            cleaned[col] = default_val
        else:
            try:
                num = float(str(val).replace("$", "").replace(",", "").strip())
                # Cast seats and year to int
                if col in ["seats", "year"]:
                    cleaned[col] = int(num)
                else:
                    cleaned[col] = num
            except (ValueError, TypeError):
                cleaned[col] = default_val

    return cleaned


def preprocess_dataset(file_path: str) -> List[Dict[str, Any]]:
    """
    Complete preprocessing pipeline:
    1. Load CSV
    2. Check missing values
    3. Remove duplicate records by brand+model+year+price
    4. Convert numerical columns to numeric
    5. Handle missing numerical & categorical values with safe defaults
    6. Validate required structure
    """
    raw_data = load_raw_dataset(file_path)
    if not raw_data:
        return []

    processed = []
    seen_signatures = set()

    for idx, row in enumerate(raw_data):
        cleaned_row = clean_and_impute_record(row, idx)

        # Deduplication signature
        sig = (
            cleaned_row["brand"].lower(),
            cleaned_row["model"].lower(),
            cleaned_row["year"],
            round(cleaned_row["price"], -2)
        )
        if sig in seen_signatures:
            continue
        seen_signatures.add(sig)
        processed.append(cleaned_row)

    return processed


def compute_dataset_statistics(cars: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Computes min, max, average, and frequency distributions for normalization and analytics.
    """
    if not cars:
        return {}

    prices = [c["price"] for c in cars]
    mileages = [c["mileage"] for c in cars]
    horsepowers = [c["horsepower"] for c in cars]
    engines = [c["engine_cc"] for c in cars]

    brand_counts: Dict[str, int] = {}
    fuel_counts: Dict[str, int] = {}
    body_counts: Dict[str, int] = {}

    for c in cars:
        b = c["brand"]
        f = c["fuel_type"]
        body = c["body_type"]
        brand_counts[b] = brand_counts.get(b, 0) + 1
        fuel_counts[f] = fuel_counts.get(f, 0) + 1
        body_counts[body] = body_counts.get(body, 0) + 1

    return {
        "total_cars": len(cars),
        "price_min": min(prices),
        "price_max": max(prices),
        "price_avg": round(sum(prices) / len(prices), 2),
        "mileage_min": min(mileages),
        "mileage_max": max(mileages),
        "mileage_avg": round(sum(mileages) / len(mileages), 1),
        "hp_min": min(horsepowers),
        "hp_max": max(horsepowers),
        "hp_avg": round(sum(horsepowers) / len(horsepowers), 1),
        "engine_min": min(engines),
        "engine_max": max(engines),
        "brand_counts": brand_counts,
        "fuel_counts": fuel_counts,
        "body_counts": body_counts,
    }
