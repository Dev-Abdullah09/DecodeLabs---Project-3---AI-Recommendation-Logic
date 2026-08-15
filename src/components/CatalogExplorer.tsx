import React, { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Database, Eye } from "lucide-react";
import { Car } from "../types";
import { CARS_DATASET } from "../data/carsData";

interface CatalogExplorerProps {
  onSelectCarForCompare?: (id: number) => void;
  selectedForCompare?: number[];
  onViewDetails?: (car: Car) => void;
}

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({
  onSelectCarForCompare,
  selectedForCompare = [],
  onViewDetails,
}) => {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [bodyFilter, setBodyFilter] = useState("All");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof Car>("price");
  const [sortAsc, setSortAsc] = useState(true);

  const brands = useMemo(() => {
    const bSet = new Set(CARS_DATASET.map((c) => c.brand));
    return ["All", ...Array.from(bSet).sort()];
  }, []);

  const bodies = useMemo(() => {
    const bSet = new Set(CARS_DATASET.map((c) => c.body_type));
    return ["All", ...Array.from(bSet).sort()];
  }, []);

  const fuels = useMemo(() => {
    const fSet = new Set(CARS_DATASET.map((c) => c.fuel_type));
    return ["All", ...Array.from(fSet).sort()];
  }, []);

  const filteredCars = useMemo(() => {
    return CARS_DATASET.filter((c) => {
      const matchSearch =
        search === "" ||
        `${c.brand} ${c.model} ${c.city} ${c.usage}`.toLowerCase().includes(search.toLowerCase());
      const matchBrand = brandFilter === "All" || c.brand === brandFilter;
      const matchBody = bodyFilter === "All" || c.body_type === bodyFilter;
      const matchFuel = fuelFilter === "All" || c.fuel_type === fuelFilter;
      return matchSearch && matchBrand && matchBody && matchFuel;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [search, brandFilter, bodyFilter, fuelFilter, sortField, sortAsc]);

  const handleSort = (field: keyof Car) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-[#0d1117] rounded-xl border border-gray-800 p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-0.5">
            <Database className="w-3.5 h-3.5" />
            <span>Dataset Ingestion & Inventory</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Vehicle Catalog Explorer ({CARS_DATASET.length} Total Records)
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">
            Preprocessed normalized dataset with 11 operational features.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 bg-[#161b22] p-3 rounded-lg border border-gray-800">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search model, brand, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#0d1117] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>

        {/* Brand */}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-[#0d1117] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
        >
          {brands.map((b) => (
            <option key={b} value={b} className="bg-[#0d1117] text-gray-200">
              Brand: {b}
            </option>
          ))}
        </select>

        {/* Body Style */}
        <select
          value={bodyFilter}
          onChange={(e) => setBodyFilter(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-[#0d1117] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
        >
          {bodies.map((b) => (
            <option key={b} value={b} className="bg-[#0d1117] text-gray-200">
              Body: {b}
            </option>
          ))}
        </select>

        {/* Fuel */}
        <select
          value={fuelFilter}
          onChange={(e) => setFuelFilter(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-[#0d1117] border border-gray-700 rounded text-gray-200 focus:outline-none focus:border-blue-500 font-medium"
        >
          {fuels.map((f) => (
            <option key={f} value={f} className="bg-[#0d1117] text-gray-200">
              Fuel: {f}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#161b22] text-gray-400 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("id")}>
                ID {sortField === "id" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("brand")}>
                Vehicle / Model {sortField === "brand" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("price")}>
                Price ($) {sortField === "price" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("fuel_economy")}>
                MPG {sortField === "fuel_economy" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5">Body Style</th>
              <th className="p-2.5">Fuel Type</th>
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("horsepower")}>
                HP {sortField === "horsepower" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5">Seats</th>
              <th className="p-2.5">Drivetrain</th>
              <th className="p-2.5 cursor-pointer select-none" onClick={() => handleSort("reliability_score")}>
                Reliability {sortField === "reliability_score" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80">
            {filteredCars.slice(0, 50).map((car) => {
              const isCompare = selectedForCompare.includes(car.id);
              return (
                <tr key={car.id} className="hover:bg-[#161b22] transition-colors">
                  <td className="p-2.5 text-gray-500 font-mono">#{car.id}</td>
                  <td className="p-2.5 font-bold text-white">
                    <div>{car.brand} {car.model}</div>
                    <span className="text-[9px] text-gray-500 font-normal">{car.year} • {car.condition}</span>
                  </td>
                  <td className="p-2.5 font-bold font-mono text-white">
                    ${car.price.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-semibold text-emerald-400">{car.fuel_economy} MPG</td>
                  <td className="p-2.5 text-gray-300">{car.body_type}</td>
                  <td className="p-2.5 text-gray-300">{car.fuel_type}</td>
                  <td className="p-2.5 font-mono font-medium text-white">{car.horsepower} HP</td>
                  <td className="p-2.5 text-gray-300">{car.seats}</td>
                  <td className="p-2.5 text-gray-300">{car.drive_type}</td>
                  <td className="p-2.5 font-bold text-gray-200">{car.reliability_score}/10</td>
                  <td className="p-2.5 text-right space-x-2">
                    {onSelectCarForCompare && (
                      <button
                        onClick={() => onSelectCarForCompare(car.id)}
                        className={`px-2 py-1 text-[10px] font-bold rounded ${
                          isCompare
                            ? "bg-blue-600 text-white"
                            : "bg-[#161b22] hover:bg-gray-800 text-gray-300 border border-gray-700"
                        }`}
                      >
                        {isCompare ? "Selected" : "+ Compare"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[11px] text-gray-400 flex items-center justify-between">
        <span>Showing {Math.min(50, filteredCars.length)} of {filteredCars.length} matches (185 total cataloged)</span>
      </div>
    </div>
  );
};
