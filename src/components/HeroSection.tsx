import React from "react";
import { Sparkles, Zap, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { UserPreferences, PriorityType } from "../types";

interface HeroSectionProps {
  onSelectPreset: (preset: Partial<UserPreferences>) => void;
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectPreset, onScrollToForm }) => {
  const presets: Array<{
    title: string;
    badge: string;
    desc: string;
    icon: string;
    prefs: Partial<UserPreferences>;
  }> = [
    {
      title: "Family Hybrid SUV",
      badge: "High MPG & Space",
      desc: "$28k–$45k • 5+ Seats • Hybrid • AWD",
      icon: "👨‍👩‍👧‍👦",
      prefs: {
        min_budget: 28000,
        max_budget: 45000,
        body_type: "SUV",
        fuel_type: "Hybrid",
        transmission: "Automatic",
        seats: 5,
        drive_type: "AWD",
        usage: "Family",
        priority: "Fuel Economy",
      },
    },
    {
      title: "Affordable Daily Commuter",
      badge: "Best Value",
      desc: "$15k–$26k • 35+ MPG • Low Mileage",
      icon: "🚗",
      prefs: {
        min_budget: 15000,
        max_budget: 26000,
        body_type: "Sedan",
        fuel_type: "Petrol",
        transmission: "CVT",
        seats: 5,
        drive_type: "FWD",
        usage: "Daily Commute",
        priority: "Budget",
      },
    },
    {
      title: "Executive Luxury Cruiser",
      badge: "Premium Comfort",
      desc: "$45k–$90k • BMW/Mercedes/Audi/Lexus",
      icon: "💎",
      prefs: {
        min_budget: 45000,
        max_budget: 90000,
        body_type: "Sedan",
        fuel_type: "Petrol",
        transmission: "Automatic",
        seats: 5,
        drive_type: "AWD",
        usage: "Luxury",
        priority: "Luxury",
      },
    },
    {
      title: "Track Performance Coupe",
      badge: "350+ Horsepower",
      desc: "350+ HP • RWD/AWD • Sport Tuning",
      icon: "🏎️",
      prefs: {
        min_budget: 40000,
        max_budget: 85000,
        body_type: "Coupe",
        min_horsepower: 350,
        transmission: "Automatic",
        seats: 4,
        usage: "Performance",
        priority: "Performance",
      },
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#050608] text-gray-200 border-b border-gray-800 py-8 md:py-10">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Algorithmic Matching Engine • DecodeLabs Project 3</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Intelligent Car Recommendations <span className="text-blue-500">•</span> Multi-Criteria Engine
            </h1>

            <p className="text-gray-400 text-xs leading-relaxed">
              Dynamically computes similarity distances across 11 features with weighted priority matrix scaling and causal explanation logic.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              id="hero-find-car-btn"
              onClick={onScrollToForm}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <span>Configure Preferences</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Demo Presets - High Density Cards */}
        <div className="mt-6 pt-5 border-t border-gray-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-blue-400" />
              <span>1-Click Benchmark Scenarios</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                id={`preset-card-${idx}`}
                onClick={() => {
                  onSelectPreset(preset.prefs);
                  onScrollToForm();
                }}
                className="group p-3 rounded-lg bg-[#0d1117] hover:bg-[#161b22] border border-gray-800 hover:border-blue-500/40 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">{preset.icon}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#161b22] text-blue-400 border border-gray-700">
                      {preset.badge}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors">
                    {preset.title}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-medium">
                    {preset.desc}
                  </div>
                </div>
                <div className="mt-2.5 text-[10px] text-blue-400 font-semibold flex items-center gap-1 opacity-75 group-hover:opacity-100">
                  <span>Load Profile</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
