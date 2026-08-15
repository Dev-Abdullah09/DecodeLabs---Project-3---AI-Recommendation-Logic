import React from "react";
import { Sliders, DollarSign, Shield, Zap, Heart, Sparkles, RefreshCw } from "lucide-react";
import { UserPreferences, PriorityType } from "../types";
import { PRIORITY_WEIGHT_PROFILES } from "../utils/recommendationLogic";

interface PreferenceFormProps {
  preferences: UserPreferences;
  onChange: (newPrefs: UserPreferences) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const PreferenceForm: React.FC<PreferenceFormProps> = ({
  preferences,
  onChange,
  onSubmit,
  onReset,
}) => {
  const priorities: Array<{ id: PriorityType; label: string; icon: string; desc: string }> = [
    { id: "Budget", label: "Budget Value", icon: "💰", desc: "Maximizes affordability & mileage" },
    { id: "Fuel Economy", label: "Fuel Economy", icon: "⚡", desc: "Boosts Hybrids & high MPG" },
    { id: "Performance", label: "Performance", icon: "🏎️", desc: "Prioritizes Horsepower & Drivetrain" },
    { id: "Family", label: "Family Space", icon: "👨‍👩‍👧‍👦", desc: "Prioritizes 5-8 seats & SUV body" },
    { id: "Luxury", label: "Luxury & Brand", icon: "💎", desc: "Focuses on prestige brands & comfort" },
    { id: "Reliability", label: "Reliability", icon: "🛡️", desc: "Proven durability index & mileage" },
    { id: "Comfort", label: "Cruising Comfort", icon: "🛋️", desc: "Smooth automatic ride & ergonomics" },
  ];

  const currentWeights = PRIORITY_WEIGHT_PROFILES[preferences.priority] || PRIORITY_WEIGHT_PROFILES.Budget;

  const brands = [
    "Any", "Toyota", "Honda", "BMW", "Mercedes", "Audi", "Ford",
    "Hyundai", "Kia", "Nissan", "Tesla", "Lexus", "Porsche",
    "Mazda", "Subaru", "Volvo", "Volkswagen", "Chevrolet", "Jeep", "Genesis"
  ];

  const bodyTypes = [
    "Any", "SUV", "Sedan", "Hatchback", "Coupe", "Convertible", "Pickup", "Wagon", "Minivan"
  ];

  const fuelTypes = [
    "Any", "Hybrid", "Electric", "Petrol", "Diesel"
  ];

  const transmissions = [
    "Any", "Automatic", "Manual", "CVT"
  ];

  const driveTypes = [
    "Any", "AWD", "FWD", "RWD", "4WD"
  ];

  const usages = [
    "Any", "Daily Commute", "Family", "Luxury", "Performance", "Off-road", "Business"
  ];

  const handleFieldChange = (field: keyof UserPreferences, value: any) => {
    onChange({
      ...preferences,
      [field]: value,
    });
  };

  return (
    <div id="preference-form-section" className="bg-[#0d1117] rounded-xl border border-gray-800 p-5 md:p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Multi-Attribute Preference Profiler</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            User Preferences & Target Constraints
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="self-start md:self-auto text-xs font-semibold text-gray-400 hover:text-white px-2.5 py-1.5 rounded bg-[#161b22] border border-gray-700 hover:border-gray-600 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-5"
      >
        {/* Priority Selector with live weight feedback */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Main Optimization Priority (Dynamic Feature Weights)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {priorities.map((p) => {
              const isSelected = preferences.priority === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  id={`priority-btn-${p.id.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleFieldChange("priority", p.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm"
                      : "bg-[#161b22] hover:bg-gray-800/80 border-gray-800 text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{p.icon}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <div className={`font-bold text-xs leading-tight ${isSelected ? "text-blue-300" : "text-white"}`}>
                    {p.label}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Real-time Applied Weights visualization bar */}
          <div className="mt-2.5 p-2.5 rounded-lg bg-[#161b22] border border-gray-800 text-xs">
            <div className="flex items-center justify-between text-gray-400 mb-1.5 font-semibold text-[10px]">
              <span>Dynamic Weight Allocation for <strong className="text-blue-400 font-bold">{preferences.priority}</strong>:</span>
              <span className="text-gray-500">Sum = 100%</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(currentWeights).map(([feat, rawW]) => {
                const w = Number(rawW) || 0;
                if (w <= 0) return null;
                const pct = Math.round(w * 100);
                const isHigh = pct >= 15;
                return (
                  <span
                    key={feat}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 ${
                      isHigh
                        ? "bg-blue-600/30 text-blue-400 border border-blue-500/30"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    <span className="capitalize">{feat.replace("_", " ")}</span>
                    <span className={isHigh ? "text-blue-300" : "text-gray-400"}>{pct}%</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Budget Min */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Minimum Budget ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold">$</span>
              <input
                type="number"
                id="input-min-budget"
                value={preferences.min_budget}
                onChange={(e) => handleFieldChange("min_budget", Math.max(0, Number(e.target.value)))}
                min="0"
                step="1000"
                className="w-full pl-6 pr-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Budget Max */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Maximum Budget ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold">$</span>
              <input
                type="number"
                id="input-max-budget"
                value={preferences.max_budget}
                onChange={(e) => handleFieldChange("max_budget", Math.max(0, Number(e.target.value)))}
                min="0"
                step="1000"
                className="w-full pl-6 pr-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Preferred Brand
            </label>
            <select
              id="select-brand"
              value={preferences.brand}
              onChange={(e) => handleFieldChange("brand", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {brands.map((b) => (
                <option key={b} value={b} className="bg-[#161b22] text-gray-200">
                  {b === "Any" ? "Any Brand" : b}
                </option>
              ))}
            </select>
          </div>

          {/* Body Type */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Body Style
            </label>
            <select
              id="select-body-type"
              value={preferences.body_type}
              onChange={(e) => handleFieldChange("body_type", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {bodyTypes.map((b) => (
                <option key={b} value={b} className="bg-[#161b22] text-gray-200">
                  {b === "Any" ? "Any Body Type" : b}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Powertrain / Fuel
            </label>
            <select
              id="select-fuel-type"
              value={preferences.fuel_type}
              onChange={(e) => handleFieldChange("fuel_type", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {fuelTypes.map((f) => (
                <option key={f} value={f} className="bg-[#161b22] text-gray-200">
                  {f === "Any" ? "Any Fuel Type" : f}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Transmission
            </label>
            <select
              id="select-transmission"
              value={preferences.transmission}
              onChange={(e) => handleFieldChange("transmission", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {transmissions.map((t) => (
                <option key={t} value={t} className="bg-[#161b22] text-gray-200">
                  {t === "Any" ? "Any Transmission" : t}
                </option>
              ))}
            </select>
          </div>

          {/* Seating */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Seating Capacity
            </label>
            <select
              id="select-seats"
              value={preferences.seats}
              onChange={(e) => handleFieldChange("seats", Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value={0} className="bg-[#161b22] text-gray-200">Any Seating</option>
              <option value={2} className="bg-[#161b22] text-gray-200">2 Passengers</option>
              <option value={4} className="bg-[#161b22] text-gray-200">4 Passengers</option>
              <option value={5} className="bg-[#161b22] text-gray-200">5 Passengers (Standard)</option>
              <option value={7} className="bg-[#161b22] text-gray-200">7 Passengers (SUV/Van)</option>
              <option value={8} className="bg-[#161b22] text-gray-200">8 Passengers (Family)</option>
            </select>
          </div>

          {/* Drivetrain */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Drivetrain
            </label>
            <select
              id="select-drive-type"
              value={preferences.drive_type}
              onChange={(e) => handleFieldChange("drive_type", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {driveTypes.map((d) => (
                <option key={d} value={d} className="bg-[#161b22] text-gray-200">
                  {d === "Any" ? "Any Drivetrain" : d}
                </option>
              ))}
            </select>
          </div>

          {/* Min Horsepower */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Minimum Horsepower (HP)
            </label>
            <input
              type="number"
              id="input-min-horsepower"
              value={preferences.min_horsepower || ""}
              placeholder="e.g. 200"
              onChange={(e) => handleFieldChange("min_horsepower", Math.max(0, Number(e.target.value)))}
              min="0"
              max="1100"
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Max Mileage */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Max Mileage (mi)
            </label>
            <input
              type="number"
              id="input-max-mileage"
              value={preferences.max_mileage || ""}
              placeholder="e.g. 30000"
              onChange={(e) => handleFieldChange("max_mileage", Math.max(0, Number(e.target.value)))}
              min="0"
              step="5000"
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Primary Usage */}
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Primary Vehicle Usage
            </label>
            <select
              id="select-usage"
              value={preferences.usage}
              onChange={(e) => handleFieldChange("usage", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-[#161b22] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              {usages.map((u) => (
                <option key={u} value={u} className="bg-[#161b22] text-gray-200">
                  {u === "Any" ? "Any Usage (General Purpose)" : u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit action */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-800">
          <div className="text-[11px] text-gray-400 font-medium text-center sm:text-left">
            Evaluating against <strong className="text-white">185</strong> cataloged records across 11 similarity dimensions.
          </div>
          <button
            type="submit"
            id="calculate-recommendations-btn"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>RUN AI ENGINE</span>
          </button>
        </div>
      </form>
    </div>
  );
};
