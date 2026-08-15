export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  engine_cc: number;
  horsepower: number;
  seats: number;
  drive_type: string;
  city: string;
  condition: string;
  rating: number;
  fuel_economy: number;
  usage: string;
  luxury_score: number;
  reliability_score: number;
  image_url?: string;
}

export type PriorityType = 
  | "Budget"
  | "Fuel Economy"
  | "Performance"
  | "Family"
  | "Luxury"
  | "Reliability"
  | "Comfort";

export interface UserPreferences {
  min_budget: number;
  max_budget: number;
  brand: string;
  body_type: string;
  fuel_type: string;
  transmission: string;
  max_mileage: number;
  engine_cc: number;
  min_horsepower: number;
  seats: number;
  drive_type: string;
  usage: string;
  priority: PriorityType;
}

export interface FeatureScores {
  budget: number;
  brand: number;
  body_type: number;
  fuel_type: number;
  transmission: number;
  mileage: number;
  engine: number;
  horsepower: number;
  seats: number;
  drive_type: number;
  usage: number;
}

export interface RecommendedCar extends Car {
  compatibility_score: number;
  score_decimal: number;
  feature_scores: FeatureScores;
  explanation: string[];
  matched_priority: PriorityType;
}

export interface RecommendationResponse {
  success: boolean;
  preferences: UserPreferences;
  applied_weights: Record<string, number>;
  recommendations: RecommendedCar[];
  meta: {
    total_cars_evaluated: number;
    top_n: number;
    best_match_score: number;
    average_score: number;
    priority_applied: PriorityType;
  };
}

export interface DatasetStatistics {
  total_cars: number;
  price_min: number;
  price_max: number;
  price_avg: number;
  mileage_min: number;
  mileage_max: number;
  mileage_avg: number;
  hp_min: number;
  hp_max: number;
  hp_avg: number;
  brand_counts: Record<string, number>;
  fuel_counts: Record<string, number>;
  body_counts: Record<string, number>;
}
