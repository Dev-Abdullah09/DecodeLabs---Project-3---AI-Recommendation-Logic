import React, { useState } from "react";
import { Check, Info, Sparkles, GitCompare, Gauge, Fuel, Users, Award, ShieldCheck, ChevronRight, Eye } from "lucide-react";
import { RecommendedCar, RecommendationResponse } from "../types";

interface RecommendationResultsProps {
  response: RecommendationResponse;
  selectedForCompare: number[];
  onToggleCompare: (carId: number) => void;
  onOpenCompareModal: () => void;
  onViewDetails: (car: RecommendedCar) => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  response,
  selectedForCompare,
  onToggleCompare,
  onOpenCompareModal,
  onViewDetails,
}) => {
  const { recommendations, meta, applied_weights, preferences } = response;

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 font-medium">No recommendations computed yet.</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", bar: "bg-emerald-500" };
    if (score >= 80) return { bg: "bg-blue-500/15 text-blue-400 border-blue-500/30", bar: "bg-blue-500" };
    if (score >= 70) return { bg: "bg-amber-500/15 text-amber-400 border-amber-500/30", bar: "bg-amber-500" };
    return { bg: "bg-rose-500/15 text-rose-400 border-rose-500/30", bar: "bg-rose-500" };
  };

  return (
    <div className="space-y-5">
      {/* Top Banner / Summary */}
      <div className="bg-[#0d1117] text-white rounded-xl p-5 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Algorithmic Matching Complete</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Top Ranked AI Recommendations
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Ranked across <strong>{meta.total_cars_evaluated}</strong> cataloged vehicles using <strong>{meta.priority_applied}</strong> priority weights.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="bg-[#161b22] border border-gray-800 rounded-lg px-3.5 py-1.5 text-center">
              <div className="text-[9px] uppercase font-bold text-gray-500">Best Match</div>
              <div className="text-lg font-bold text-emerald-400">{meta.best_match_score}%</div>
            </div>
            <div className="bg-[#161b22] border border-gray-800 rounded-lg px-3.5 py-1.5 text-center">
              <div className="text-[9px] uppercase font-bold text-gray-500">Priority</div>
              <div className="text-xs font-bold text-blue-400">{meta.priority_applied}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating comparison bar if selected */}
      {selectedForCompare.length > 0 && (
        <div className="sticky top-16 z-30 bg-blue-600 text-white p-3 rounded-lg shadow-lg flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-blue-200" />
            <span className="text-xs font-bold">
              {selectedForCompare.length} {selectedForCompare.length === 1 ? "vehicle" : "vehicles"} selected for comparison
            </span>
          </div>
          <button
            id="compare-tray-btn"
            onClick={onOpenCompareModal}
            className="px-3 py-1 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded transition-colors"
          >
            Open Side-by-Side Comparison Matrix →
          </button>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((car, index) => {
          const scoreTheme = getScoreColor(car.compatibility_score);
          const isSelected = selectedForCompare.includes(car.id);
          const isTopMatch = index === 0;

          return (
            <div
              key={car.id}
              id={`car-recommendation-card-${car.id}`}
              className={`bg-[#0d1117] rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative ${
                isTopMatch
                  ? "border-blue-500/60 ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/5"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Header Badge & Title */}
              <div className="p-4 pb-2.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isTopMatch
                          ? "bg-blue-600 text-white"
                          : "bg-[#161b22] text-gray-400 border border-gray-800"
                      }`}
                    >
                      #{index + 1} {isTopMatch ? "Top Match" : "Recommendation"}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {car.year} • {car.condition}
                    </span>
                  </div>

                  {/* Match Score Badge */}
                  <div className={`px-2 py-0.5 rounded border font-bold text-[11px] flex items-center gap-1 ${scoreTheme.bg}`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{car.compatibility_score}% Match</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-tight">
                  {car.brand} {car.model}
                </h3>

                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-800">
                  <div>
                    <span className="text-lg font-bold font-mono text-white">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-blue-400" />
                    <span>{car.fuel_economy} MPG</span>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="px-4 py-1.5">
                <div className="grid grid-cols-3 gap-1.5 bg-[#161b22] p-2.5 rounded-lg border border-gray-800 text-[10px]">
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Body</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.body_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Powertrain</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.fuel_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Transmission</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Drivetrain</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.drive_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Power</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.horsepower} HP</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] uppercase block">Seating</span>
                    <span className="font-semibold text-gray-200 truncate block">{car.seats} Seats</span>
                  </div>
                </div>
              </div>

              {/* Explainable AI: Why This Car? */}
              <div className="px-4 py-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Why Recommended by Engine:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-gray-300 font-medium">
                  {car.explanation.slice(0, 3).map((reason, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Sub-scores progress */}
              <div className="px-4 py-2 space-y-1.5 border-t border-gray-800 bg-[#161b22]/50">
                <div className="flex items-center justify-between text-[9px] font-bold text-gray-400">
                  <span>Budget Compatibility:</span>
                  <span className="text-gray-200 font-mono">{car.feature_scores.budget}%</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${car.feature_scores.budget}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 pt-0.5">
                  <span>Powertrain & Efficiency:</span>
                  <span className="text-gray-200 font-mono">{car.feature_scores.fuel_type}%</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${car.feature_scores.fuel_type}%` }}
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-[#161b22] border-t border-gray-800 flex items-center justify-between gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-300 select-none">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleCompare(car.id)}
                    className="w-3.5 h-3.5 rounded bg-[#0d1117] border-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Compare</span>
                </label>

                <button
                  id={`view-details-btn-${car.id}`}
                  onClick={() => onViewDetails(car)}
                  className="px-2.5 py-1 rounded bg-[#0d1117] border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Specs</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
