"""
Unit Tests for AutoMatch AI Data Preprocessing.
Tests CSV parsing, type casting, missing value imputation, deduplication, and statistics.
"""

import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.preprocessing import (
    clean_and_impute_record,
    preprocess_dataset,
    compute_dataset_statistics,
)


class TestPreprocessing(unittest.TestCase):
    """Tests preprocessing pipeline."""

    def test_clean_and_impute_missing_values(self):
        dirty_row = {
            "id": "",
            "brand": "",
            "model": "",
            "price": "$28,500",
            "year": "2023",
            "seats": "",
            "fuel_type": ""
        }
        cleaned = clean_and_impute_record(dirty_row, 0)
        self.assertEqual(cleaned["id"], 1)
        self.assertEqual(cleaned["brand"], "Toyota")
        self.assertEqual(cleaned["price"], 28500.0)
        self.assertEqual(cleaned["year"], 2023)
        self.assertEqual(cleaned["seats"], 5)
        self.assertEqual(cleaned["fuel_type"], "Petrol")

    def test_preprocess_dataset_loads(self):
        data_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            "data",
            "cars.csv"
        )
        cars = preprocess_dataset(data_path)
        self.assertGreater(len(cars), 50)
        for car in cars:
            self.assertIsInstance(car["price"], (int, float))
            self.assertIsInstance(car["horsepower"], (int, float))
            self.assertIsInstance(car["brand"], str)

    def test_statistics_calculation(self):
        sample_cars = [
            {"brand": "Toyota", "price": 20000, "mileage": 10000, "horsepower": 150, "engine_cc": 1800, "fuel_type": "Petrol", "body_type": "Sedan"},
            {"brand": "Honda", "price": 30000, "mileage": 20000, "horsepower": 200, "engine_cc": 2000, "fuel_type": "Hybrid", "body_type": "SUV"}
        ]
        stats = compute_dataset_statistics(sample_cars)
        self.assertEqual(stats["total_cars"], 2)
        self.assertEqual(stats["price_min"], 20000)
        self.assertEqual(stats["price_max"], 30000)
        self.assertEqual(stats["price_avg"], 25000.0)
        self.assertEqual(stats["brand_counts"]["Toyota"], 1)


if __name__ == "__main__":
    unittest.main()
