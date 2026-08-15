import React from "react";
import { Brain, Cpu, Activity, Scale, CheckCircle2, ChevronRight } from "lucide-react";
import { UserPreferences, RecommendationResponse } from "../types";
import { PRIORITY_WEIGHT_PROFILES } from "../utils/recommendationLogic";

interface HowAiDecidedProps {
  response: RecommendationResponse;
}

export const HowAiDecided: React.FC<HowAiDecidedProps> = ({ response }) => {
  const { preferences, applied_weights, recommendations } = response;
  const topCar = recommendations[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-5">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
          <Brain className="w-3.5 h-3.5" />
          <span>Algorithmic Transparency & Model Logic</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          How the AI Matching Engine Decided
        </h2>
        <p className="text-gray-400 text-xs mt-1 max-w-3xl leading-relaxed">
          AutoMatch AI utilizes an interpretable multi-criteria recommendation architecture: preference vector profiling, normalized distance similarity metrics, dynamic weight adaptation, and explainable AI causal reasoning.
        </p>
      </div>

      {/* 4-Step Mathematical Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">STEP 01</span>
            <h3 className="font-bold text-sm text-white mt-2">Preference Profiling</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              Constructs an 11-dimensional query vector U = [Budget, Brand, Body, Fuel, ...] from input constraints.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] font-mono text-gray-400 bg-[#161b22] p-2 rounded">
            U.priority = &quot;{preferences.priority}&quot;
          </div>
        </div>

        <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">STEP 02</span>
            <h3 className="font-bold text-sm text-white mt-2">Weight Allocation</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              Dynamically shifts weight distribution W(P) to align with user goals (e.g. boosting MPG weight).
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] font-mono text-gray-400 bg-[#161b22] p-2 rounded">
            w_sum = 100% (Normalized)
          </div>
        </div>

        <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">STEP 03</span>
            <h3 className="font-bold text-sm text-white mt-2">Similarity Scoring</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              Calculates categorical and normalized distance metric: Sim = max(0, 1 - |Val - Pref| / Range).
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] font-mono text-gray-400 bg-[#161b22] p-2 rounded">
            0.0 ≤ s_i ≤ 1.0 (Bounded)
          </div>
        </div>

        <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">STEP 04</span>
            <h3 className="font-bold text-sm text-white mt-2">Weighted Sum & XAI</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              Score = (∑ w_i · s_i / ∑ w_i) × 100%, sorts descending, and generates natural-language explanations.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] font-mono text-gray-400 bg-[#161b22] p-2 rounded">
            Ranked: Top 5 Output
          </div>
        </div>
      </div>

      {/* Mathematical Breakdown of the Top Candidate */}
      {topCar && (
        <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Candidate Evaluation Audit</span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Mathematical Scoring Audit for Top Match: {topCar.brand} {topCar.model} ({topCar.compatibility_score}%)
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-emerald-400">{topCar.compatibility_score}%</span>
              <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Aggregate Compatibility</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#161b22] text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-800">
                  <th className="p-2.5">Evaluation Attribute</th>
                  <th className="p-2.5">User Preference</th>
                  <th className="p-2.5">Vehicle Value</th>
                  <th className="p-2.5">Similarity Metric $s_i$</th>
                  <th className="p-2.5">Priority Weight $w_i$</th>
                  <th className="p-2.5 text-right">Weighted Sub-Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Budget ($)</td>
                  <td className="p-2.5 text-gray-400">
                    ${preferences.min_budget?.toLocaleString() || 0} – ${preferences.max_budget?.toLocaleString() || "∞"}
                  </td>
                  <td className="p-2.5 font-medium text-white">${topCar.price.toLocaleString()}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.budget}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.budget || 20}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.budget * (applied_weights.budget || 20)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Brand</td>
                  <td className="p-2.5 text-gray-400">{preferences.brand}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.brand}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.brand}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.brand || 10}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.brand * (applied_weights.brand || 10)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Body Style</td>
                  <td className="p-2.5 text-gray-400">{preferences.body_type}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.body_type}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.body_type}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.body_type || 10}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.body_type * (applied_weights.body_type || 10)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Powertrain / Fuel</td>
                  <td className="p-2.5 text-gray-400">{preferences.fuel_type}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.fuel_type} ({topCar.fuel_economy} MPG)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.fuel_type}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.fuel_type || 10}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.fuel_type * (applied_weights.fuel_type || 10)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Transmission</td>
                  <td className="p-2.5 text-gray-400">{preferences.transmission}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.transmission}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.transmission}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.transmission || 10}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.transmission * (applied_weights.transmission || 10)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Seating Capacity</td>
                  <td className="p-2.5 text-gray-400">{preferences.seats > 0 ? `${preferences.seats}+ Seats` : "Any"}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.seats} Seats</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.seats}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.seats || 5}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.seats * (applied_weights.seats || 5)) / 100).toFixed(1)}%
                  </td>
                </tr>

                <tr className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 font-bold text-white">Horsepower (HP)</td>
                  <td className="p-2.5 text-gray-400">{preferences.min_horsepower > 0 ? `${preferences.min_horsepower}+ HP` : "Any"}</td>
                  <td className="p-2.5 font-medium text-white">{topCar.horsepower} HP</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold font-mono text-[10px]">
                      {topCar.feature_scores.horsepower}%
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-400 font-mono">{applied_weights.horsepower || 5}%</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">
                    {((topCar.feature_scores.horsepower * (applied_weights.horsepower || 5)) / 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dynamic Weight Profiles Reference Matrix */}
      <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-5 space-y-3">
        <div>
          <h3 className="text-base font-bold text-white">
            Priority-Weight Profile Configuration Matrix
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Shows how user priorities dynamically shift importance across evaluation attributes.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-[#161b22] text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-800">
                <th className="p-2.5 text-left">Attribute</th>
                <th className="p-2.5">Budget</th>
                <th className="p-2.5">Fuel Economy</th>
                <th className="p-2.5">Performance</th>
                <th className="p-2.5">Family</th>
                <th className="p-2.5">Luxury</th>
                <th className="p-2.5">Reliability</th>
                <th className="p-2.5">Comfort</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80">
              {Object.keys(PRIORITY_WEIGHT_PROFILES.Budget).map((feat) => (
                <tr key={feat} className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 text-left font-bold capitalize text-white">
                    {feat.replace("_", " ")}
                  </td>
                  {Object.keys(PRIORITY_WEIGHT_PROFILES).map((pKey) => {
                    const val = (PRIORITY_WEIGHT_PROFILES as any)[pKey][feat] || 0;
                    const pct = Math.round(val * 100);
                    const isHigh = pct >= 20;
                    return (
                      <td key={pKey} className="p-2 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${isHigh ? "bg-blue-600 text-white font-bold" : "text-gray-300"}`}>
                          {pct}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
