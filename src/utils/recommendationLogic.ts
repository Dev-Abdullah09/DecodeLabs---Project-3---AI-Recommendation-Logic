import { Car, FeatureScores, PriorityType, RecommendedCar, RecommendationResponse, UserPreferences } from "../types";
import { CARS_DATASET } from "../data/carsData";

export const DEFAULT_WEIGHTS: Record<string, number> = {
  budget: 0.20,
  brand: 0.10,
  body_type: 0.10,
  fuel_type: 0.10,
  transmission: 0.10,
  mileage: 0.10,
  engine: 0.05,
  horsepower: 0.05,
  seats: 0.05,
  drive_type: 0.05,
  usage: 0.10,
};

export const PRIORITY_WEIGHT_PROFILES: Record<PriorityType, Record<string, number>> = {
  Budget: {
    budget: 0.35, mileage: 0.15, fuel_type: 0.12, brand: 0.06,
    body_type: 0.08, transmission: 0.06, engine: 0.03, horsepower: 0.03,
    seats: 0.04, drive_type: 0.03, usage: 0.05
  },
  "Fuel Economy": {
    fuel_type: 0.25, mileage: 0.18, budget: 0.20, engine: 0.10,
    body_type: 0.08, transmission: 0.07, usage: 0.06, brand: 0.03,
    horsepower: 0.01, seats: 0.02, drive_type: 0.00
  },
  Performance: {
    horsepower: 0.25, engine: 0.15, drive_type: 0.15, budget: 0.12,
    body_type: 0.10, transmission: 0.08, brand: 0.05, mileage: 0.04,
    usage: 0.04, fuel_type: 0.02, seats: 0.00
  },
  Family: {
    seats: 0.25, body_type: 0.20, budget: 0.15, usage: 0.15,
    drive_type: 0.08, fuel_type: 0.05, transmission: 0.05, mileage: 0.04,
    brand: 0.03, engine: 0.00, horsepower: 0.00
  },
  Luxury: {
    brand: 0.25, usage: 0.18, body_type: 0.12, budget: 0.12,
    transmission: 0.10, horsepower: 0.08, drive_type: 0.06, engine: 0.04,
    mileage: 0.03, seats: 0.02, fuel_type: 0.00
  },
  Reliability: {
    brand: 0.25, mileage: 0.20, budget: 0.18, transmission: 0.10,
    fuel_type: 0.09, body_type: 0.08, usage: 0.05, seats: 0.02,
    engine: 0.01, horsepower: 0.01, drive_type: 0.01
  },
  Comfort: {
    body_type: 0.18, seats: 0.16, transmission: 0.14, budget: 0.14,
    brand: 0.12, usage: 0.10, drive_type: 0.06, fuel_type: 0.05,
    mileage: 0.03, engine: 0.01, horsepower: 0.01
  }
};

export function calculateCategoricalSimilarity(carVal: string, prefVal?: string): number {
  if (!prefVal || prefVal.trim() === "" || prefVal.toLowerCase() === "any") {
    return 1.0;
  }
  const c = carVal.trim().toLowerCase();
  const p = prefVal.trim().toLowerCase();

  if (c === p) return 1.0;

  // Soft partial matches
  if ((c === "cvt" && p === "automatic") || (c === "automatic" && p === "cvt")) return 0.85;
  if ((c === "awd" && p === "4wd") || (c === "4wd" && p === "awd")) return 0.90;
  if ((c === "hybrid" && p === "petrol") || (c === "petrol" && p === "hybrid")) return 0.60;
  if ((c === "hatchback" && p === "wagon") || (c === "wagon" && p === "hatchback")) return 0.70;
  if ((c === "coupe" && p === "sedan") || (c === "sedan" && p === "coupe")) return 0.50;

  return 0.0;
}

export function calculateNumericalSimilarity(carVal: number, prefVal: number | undefined, acceptableRange: number): number {
  if (prefVal === undefined || acceptableRange <= 0) return 1.0;
  const diff = Math.abs(carVal - prefVal);
  const score = 1.0 - (diff / acceptableRange);
  return Math.max(0.0, Math.min(1.0, score));
}

export function calculateBudgetScore(carPrice: number, minBudget?: number, maxBudget?: number): number {
  if (!maxBudget || maxBudget <= 0) return 1.0;
  const minB = minBudget && minBudget > 0 ? minBudget : 0;
  const maxB = Math.max(maxBudget, minB);

  if (carPrice >= minB && carPrice <= maxB) {
    return 1.0;
  }

  if (carPrice < minB) {
    // Under minimum budget is favorable
    const savingPct = (minB - carPrice) / Math.max(minB, 1.0);
    return Math.max(0.80, 1.0 - (savingPct * 0.20));
  }

  if (carPrice > maxB) {
    const overPct = (carPrice - maxB) / maxB;
    if (overPct <= 0.10) {
      return Math.max(0.60, 1.0 - (overPct * 3.5));
    } else if (overPct <= 0.25) {
      return Math.max(0.20, 0.65 - (overPct * 1.8));
    } else {
      return Math.max(0.0, 0.20 - (overPct * 0.5));
    }
  }

  return 1.0;
}

export function calculateMileageScore(carMileage: number, maxMileagePref?: number): number {
  if (!maxMileagePref || maxMileagePref <= 0) return 1.0;
  if (carMileage <= maxMileagePref) {
    const ratio = carMileage / Math.max(maxMileagePref, 1.0);
    return Math.max(0.85, 1.0 - (ratio * 0.15));
  } else {
    const overRatio = (carMileage - maxMileagePref) / maxMileagePref;
    return Math.max(0.0, 1.0 - overRatio);
  }
}

export function calculateHorsepowerScore(carHp: number, minHpPref?: number): number {
  if (!minHpPref || minHpPref <= 0) return 1.0;
  if (carHp >= minHpPref) return 1.0;
  const deficit = minHpPref - carHp;
  return Math.max(0.0, 1.0 - (deficit / Math.max(minHpPref, 50.0)));
}

export function calculateSeatsScore(carSeats: number, prefSeats?: number): number {
  if (!prefSeats || prefSeats <= 0) return 1.0;
  if (carSeats === prefSeats) return 1.0;
  if (carSeats > prefSeats) {
    const diff = carSeats - prefSeats;
    return Math.max(0.70, 1.0 - (diff * 0.15));
  } else {
    const deficit = prefSeats - carSeats;
    return Math.max(0.0, 1.0 - (deficit * 0.45));
  }
}

export function generateExplanation(
  car: Car,
  preferences: UserPreferences,
  featureScores: FeatureScores,
  finalScorePct: number
): string[] {
  const reasons: string[] = [];

  // Budget
  if (featureScores.budget >= 95) {
    if (preferences.max_budget) {
      reasons.push(`Comfortably within budget at $${car.price.toLocaleString()} (Max: $${preferences.max_budget.toLocaleString()})`);
    } else {
      reasons.push(`Outstanding value at $${car.price.toLocaleString()}`);
    }
  } else if (featureScores.budget >= 70) {
    reasons.push(`Near target budget at $${car.price.toLocaleString()} with strong feature value`);
  }

  // Body Type
  if (featureScores.body_type >= 99 && preferences.body_type && preferences.body_type !== "Any") {
    reasons.push(`Exact match for preferred ${car.body_type} body style`);
  }

  // Fuel Type
  if (featureScores.fuel_type >= 99 && preferences.fuel_type && preferences.fuel_type !== "Any") {
    reasons.push(`Matches preferred ${car.fuel_type} powertrain (${car.fuel_economy} MPG efficiency)`);
  }

  // Transmission
  if (featureScores.transmission >= 99 && preferences.transmission && preferences.transmission !== "Any") {
    reasons.push(`Fitted with preferred ${car.transmission} transmission`);
  }

  // Brand
  if (featureScores.brand >= 99 && preferences.brand && preferences.brand !== "Any") {
    reasons.push(`Exact brand match: ${car.brand} (Reliability rating: ${car.reliability_score}/10)`);
  }

  // Seats
  if (featureScores.seats >= 95 && preferences.seats && preferences.seats > 0) {
    reasons.push(`Provides required ${car.seats}-passenger seating capacity`);
  }

  // Horsepower
  if (featureScores.horsepower >= 95 && preferences.min_horsepower && preferences.min_horsepower > 0) {
    reasons.push(`Delivers ${car.horsepower} HP output exceeding requirement`);
  }

  // Drivetrain
  if (featureScores.drive_type >= 90 && preferences.drive_type && preferences.drive_type !== "Any") {
    reasons.push(`Equipped with desired ${car.drive_type} drivetrain`);
  }

  // Usage
  if (featureScores.usage >= 90 && preferences.usage && preferences.usage !== "Any") {
    reasons.push(`Optimized for ${car.usage} driving routines`);
  }

  if (reasons.length < 2) {
    reasons.push(`High overall compatibility score of ${finalScorePct}%`);
    reasons.push(`Proven reliability index of ${car.reliability_score}/10 and ${car.fuel_economy} MPG`);
  }

  return reasons;
}

export function recommendCars(
  preferences: UserPreferences,
  customCars?: Car[],
  topN: number = 5
): RecommendationResponse {
  const cars = customCars || CARS_DATASET;
  const priority = preferences.priority || "Budget";
  const weights = PRIORITY_WEIGHT_PROFILES[priority] || DEFAULT_WEIGHTS;

  const scoredCars: RecommendedCar[] = cars.map((car) => {
    const rawScores: FeatureScores = {
      budget: calculateBudgetScore(car.price, preferences.min_budget, preferences.max_budget),
      brand: calculateCategoricalSimilarity(car.brand, preferences.brand),
      body_type: calculateCategoricalSimilarity(car.body_type, preferences.body_type),
      fuel_type: calculateCategoricalSimilarity(car.fuel_type, preferences.fuel_type),
      transmission: calculateCategoricalSimilarity(car.transmission, preferences.transmission),
      mileage: calculateMileageScore(car.mileage, preferences.max_mileage),
      engine: calculateNumericalSimilarity(car.engine_cc, preferences.engine_cc, 1800.0),
      horsepower: calculateHorsepowerScore(car.horsepower, preferences.min_horsepower),
      seats: calculateSeatsScore(car.seats, preferences.seats),
      drive_type: calculateCategoricalSimilarity(car.drive_type, preferences.drive_type),
      usage: calculateCategoricalSimilarity(car.usage, preferences.usage),
    };

    let totalScore = 0.0;
    let weightSum = 0.0;

    for (const [feat, weight] of Object.entries(weights)) {
      const score = (rawScores as any)[feat] ?? 0;
      totalScore += score * weight;
      weightSum += weight;
    }

    const normalizedScore = Math.max(0.0, Math.min(1.0, totalScore / Math.max(weightSum, 1e-6)));
    const scorePct = Math.round(normalizedScore * 1000) / 10;

    const featureScoresPct: FeatureScores = {
      budget: Math.round(rawScores.budget * 1000) / 10,
      brand: Math.round(rawScores.brand * 1000) / 10,
      body_type: Math.round(rawScores.body_type * 1000) / 10,
      fuel_type: Math.round(rawScores.fuel_type * 1000) / 10,
      transmission: Math.round(rawScores.transmission * 1000) / 10,
      mileage: Math.round(rawScores.mileage * 1000) / 10,
      engine: Math.round(rawScores.engine * 1000) / 10,
      horsepower: Math.round(rawScores.horsepower * 1000) / 10,
      seats: Math.round(rawScores.seats * 1000) / 10,
      drive_type: Math.round(rawScores.drive_type * 1000) / 10,
      usage: Math.round(rawScores.usage * 1000) / 10,
    };

    const explanation = generateExplanation(car, preferences, rawScores, Math.round(scorePct));

    return {
      ...car,
      compatibility_score: scorePct,
      score_decimal: normalizedScore,
      feature_scores: featureScoresPct,
      explanation,
      matched_priority: priority,
    };
  });

  scoredCars.sort((a, b) => {
    if (b.compatibility_score !== a.compatibility_score) {
      return b.compatibility_score - a.compatibility_score;
    }
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    return b.rating - a.rating;
  });

  const topRecommendations = scoredCars.slice(0, topN);
  const allScores = scoredCars.map(c => c.compatibility_score);
  const avgScore = allScores.length > 0 ? Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10 : 0;
  const bestScore = topRecommendations.length > 0 ? topRecommendations[0].compatibility_score : 0;

  const appliedWeightsPercentages: Record<string, number> = {};
  for (const [k, v] of Object.entries(weights)) {
    appliedWeightsPercentages[k] = Math.round(v * 1000) / 10;
  }

  return {
    success: true,
    preferences,
    applied_weights: appliedWeightsPercentages,
    recommendations: topRecommendations,
    meta: {
      total_cars_evaluated: cars.length,
      top_n: topN,
      best_match_score: bestScore,
      average_score: avgScore,
      priority_applied: priority,
    },
  };
}
