import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { BarChart3, TrendingUp, DollarSign, Fuel } from "lucide-react";
import { CARS_DATASET } from "../data/carsData";

export const AnalyticsDashboard: React.FC = () => {
  // Brand distribution
  const brandData = useMemo(() => {
    const counts: Record<string, number> = {};
    CARS_DATASET.forEach((c) => {
      counts[c.brand] = (counts[c.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  // Fuel type distribution
  const fuelData = useMemo(() => {
    const counts: Record<string, number> = {};
    CARS_DATASET.forEach((c) => {
      counts[c.fuel_type] = (counts[c.fuel_type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  // Body style distribution
  const bodyData = useMemo(() => {
    const counts: Record<string, number> = {};
    CARS_DATASET.forEach((c) => {
      counts[c.body_type] = (counts[c.body_type] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Price bins
  const priceBins = useMemo(() => {
    const bins = [
      { range: "< $25k", count: 0 },
      { range: "$25k–$35k", count: 0 },
      { range: "$35k–$50k", count: 0 },
      { range: "$50k–$75k", count: 0 },
      { range: "> $75k", count: 0 },
    ];
    CARS_DATASET.forEach((c) => {
      if (c.price < 25000) bins[0].count++;
      else if (c.price < 35000) bins[1].count++;
      else if (c.price < 50000) bins[2].count++;
      else if (c.price < 75000) bins[3].count++;
      else bins[4].count++;
    });
    return bins;
  }, []);

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

  const avgPrice = Math.round(CARS_DATASET.reduce((a, b) => a + b.price, 0) / CARS_DATASET.length);
  const avgMpg = Math.round((CARS_DATASET.reduce((a, b) => a + b.fuel_economy, 0) / CARS_DATASET.length) * 10) / 10;
  const avgHp = Math.round(CARS_DATASET.reduce((a, b) => a + b.horsepower, 0) / CARS_DATASET.length);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-5">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Vehicle Catalog Data Intelligence</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Catalog Statistics & Market Distributions
        </h2>
        <p className="text-gray-400 text-xs mt-0.5">
          Statistical overview across 185 vehicles in the recommendation knowledge base.
        </p>

        {/* Top metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-[#161b22] p-3 rounded-lg border border-gray-800">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Total Catalog Size</span>
            <span className="text-xl font-bold text-white">{CARS_DATASET.length} Vehicles</span>
          </div>
          <div className="bg-[#161b22] p-3 rounded-lg border border-gray-800">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Average Market Price</span>
            <span className="text-xl font-bold text-blue-400">${avgPrice.toLocaleString()}</span>
          </div>
          <div className="bg-[#161b22] p-3 rounded-lg border border-gray-800">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Mean Fuel Economy</span>
            <span className="text-xl font-bold text-emerald-400">{avgMpg} MPG</span>
          </div>
          <div className="bg-[#161b22] p-3 rounded-lg border border-gray-800">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Mean Power Output</span>
            <span className="text-xl font-bold text-indigo-400">{avgHp} HP</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Price Tiers */}
        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Price Bracket Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceBins}>
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#161b22", borderColor: "#374151", color: "#f3f4f6", fontSize: "12px", borderRadius: "8px" }}
                  itemStyle={{ color: "#60a5fa" }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel Powertrains */}
        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Powertrain / Fuel Breakdown</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fuelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {fuelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#161b22", borderColor: "#374151", color: "#f3f4f6", fontSize: "12px", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Brands */}
        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Top 10 Manufacturers in Catalog</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#161b22", borderColor: "#374151", color: "#f3f4f6", fontSize: "12px", borderRadius: "8px" }}
                  itemStyle={{ color: "#34d399" }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body Styles */}
        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Body Style Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bodyData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} stroke="#374151" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#161b22", borderColor: "#374151", color: "#f3f4f6", fontSize: "12px", borderRadius: "8px" }}
                  itemStyle={{ color: "#a78bfa" }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
