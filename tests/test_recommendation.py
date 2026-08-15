"""
Unit Tests for AutoMatch AI Recommendation Engine.
Tests similarity calculations, budget scoring, dynamic weights, ranking, and edge cases.
"""

import unittest
import sys
import os

# Add parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.scoring import (
    calculate_categorical_similarity,
    calculate_numerical_similarity,
    calculate_budget_score,
    calculate_mileage_score,
    calculate_horsepower_score,
    calculate_seats_score,
    PRIORITY_WEIGHT_PROFILES,
    DEFAULT_WEIGHTS,
)
from models.recommendation_engine import CarRecommendationEngine


class TestScoringFunctions(unittest.TestCase):
    """Tests core mathematical scoring functions."""

    def test_categorical_exact_match(self):
        self.assertEqual(calculate_categorical_similarity("Toyota", "Toyota"), 1.0)
        self.assertEqual(calculate_categorical_similarity("SUV", "suv"), 1.0)
        self.assertEqual(calculate_categorical_similarity("Petrol", "Petrol"), 1.0)

    def test_categorical_partial_match(self):
        # CVT vs Automatic partial match
        self.assertGreater(calculate_categorical_similarity("CVT", "Automatic"), 0.8)
        # AWD vs 4WD partial match
        self.assertGreater(calculate_categorical_similarity("AWD", "4WD"), 0.85)

    def test_categorical_any_fallback(self):
        self.assertEqual(calculate_categorical_similarity("Mercedes", "Any"), 1.0)
        self.assertEqual(calculate_categorical_similarity("Petrol", None), 1.0)
        self.assertEqual(calculate_categorical_similarity("Sedan", ""), 1.0)

    def test_numerical_similarity_clamped(self):
        # Exact match
        self.assertEqual(calculate_numerical_similarity(2000, 2000, 1000), 1.0)
        # Half range
        self.assertAlmostEqual(calculate_numerical_similarity(2500, 2000, 1000), 0.5)
        # Out of range (must clamp to 0.0, no negative numbers allowed)
        self.assertEqual(calculate_numerical_similarity(5000, 2000, 1000), 0.0)

    def test_budget_scoring(self):
        # Inside budget range
        self.assertEqual(calculate_budget_score(25000, 20000, 30000), 1.0)
        # Below min budget (saving money is rewarding)
        self.assertGreaterEqual(calculate_budget_score(15000, 20000, 30000), 0.80)
        # Slightly above max budget (soft penalty)
        self.assertGreater(calculate_budget_score(32000, 20000, 30000), 0.50)
        # Greatly above budget (severe penalty)
        self.assertLess(calculate_budget_score(80000, 20000, 30000), 0.10)

    def test_seats_scoring(self):
        self.assertEqual(calculate_seats_score(5, 5), 1.0)
        # Extra seats is fine
        self.assertGreaterEqual(calculate_seats_score(7, 5), 0.70)
        # Deficit is penalized
        self.assertEqual(calculate_seats_score(2, 5), 0.0)


class TestRecommendationEngine(unittest.TestCase):
    """Tests the complete CarRecommendationEngine pipeline."""

    @classmethod
    def setUpClass(cls):
        cls.engine = CarRecommendationEngine()

    def test_dataset_loaded(self):
        self.assertGreater(len(self.engine.cars), 50)
        self.assertIn("total_cars", self.engine.stats)

    def test_dynamic_priority_weights(self):
        budget_weights = self.engine.get_priority_weights("Budget")
        self.assertEqual(budget_weights["budget"], 0.35)

        perf_weights = self.engine.get_priority_weights("Performance")
        self.assertEqual(perf_weights["horsepower"], 0.25)

        default_weights = self.engine.get_priority_weights(None)
        self.assertEqual(default_weights["budget"], DEFAULT_WEIGHTS["budget"])

    def test_family_hybrid_suv_scenario(self):
        preferences = {
            "min_budget": 25000,
            "max_budget": 45000,
            "body_type": "SUV",
            "fuel_type": "Hybrid",
            "transmission": "Automatic",
            "seats": 5,
            "priority": "Fuel Economy"
        }
        res = self.engine.recommend_cars(preferences, top_n=5)
        self.assertTrue(res["success"])
        self.assertEqual(len(res["recommendations"]), 5)

        top_car = res["recommendations"][0]
        self.assertGreaterEqual(top_car["compatibility_score"], 80.0)
        self.assertIn("SUV", [c["body_type"] for c in res["recommendations"][:3]])
        self.assertIn("Hybrid", [c["fuel_type"] for c in res["recommendations"][:3]])
        self.assertGreater(len(top_car["explanation"]), 0)

    def test_empty_preferences_graceful(self):
        res = self.engine.recommend_cars({}, top_n=5)
        self.assertTrue(res["success"])
        self.assertEqual(len(res["recommendations"]), 5)


if __name__ == "__main__":
    unittest.main()
