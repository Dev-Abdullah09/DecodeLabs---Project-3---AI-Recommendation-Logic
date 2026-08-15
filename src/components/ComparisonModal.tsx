import React from "react";
import { X, Check, Award, Fuel, Gauge, DollarSign, Shield } from "lucide-react";
import { Car } from "../types";

interface ComparisonModalProps {
  cars: Car[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCar: (id: number) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  cars,
  isOpen,
  onClose,
  onRemoveCar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] w-full max-w-5xl rounded-xl shadow-2xl border border-gray-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#161b22] text-white flex items-center justify-between border-b border-gray-800">
          <div>
            <h3 className="text-base font-bold text-white">Side-by-Side Vehicle Comparison Matrix</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Comparing {cars.length} selected vehicle candidate{cars.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-4 overflow-x-auto flex-1">
          {cars.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-xs">
              No vehicles selected for comparison.
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-2.5 bg-[#161b22] text-gray-400 font-bold uppercase text-[10px] tracking-wider w-36">Attribute</th>
                  {cars.map((car) => (
                    <th key={car.id} className="p-2.5 font-bold text-white min-w-[180px] bg-[#0d1117]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-white">{car.brand} {car.model}</div>
                          <div className="text-xs text-blue-400 font-mono font-bold mt-0.5">${car.price.toLocaleString()}</div>
                          <div className="text-[9px] text-gray-500 font-medium">{car.year} • {car.condition}</div>
                        </div>
                        <button
                          onClick={() => onRemoveCar(car.id)}
                          className="text-gray-500 hover:text-rose-400 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Price</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 font-bold text-white font-mono text-xs">
                      ${car.price.toLocaleString()}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Fuel Economy</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 font-semibold text-emerald-400">
                      {car.fuel_economy} MPG
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Powertrain</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.fuel_type}</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Body Style</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.body_type}</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Transmission</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.transmission}</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Drivetrain</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.drive_type}</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Horsepower</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 font-bold text-white font-mono">
                      {car.horsepower} HP
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Engine Size</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.engine_cc} cc</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Seating</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.seats} Passengers</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Mileage</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.mileage.toLocaleString()} mi</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Reliability Score</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 font-bold text-emerald-400">
                      {car.reliability_score} / 10
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Primary Usage</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-300 font-medium">{car.usage}</td>
                  ))}
                </tr>

                <tr className="hover:bg-[#161b22]/40 transition-colors">
                  <td className="p-2.5 font-bold bg-[#161b22]/60 text-gray-300">Location</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2.5 text-gray-400">{car.city}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="p-3 bg-[#161b22] border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-bold rounded-lg transition-colors"
          >
            Close Comparison Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
