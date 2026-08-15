import React from "react";
import { X, Check, Award, Fuel, Gauge, DollarSign, Shield, MapPin, Calendar, Activity } from "lucide-react";
import { Car, RecommendedCar } from "../types";

interface CarDetailModalProps {
  car: Car | RecommendedCar | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose }) => {
  if (!isOpen || !car) return null;

  const isRecommended = "compatibility_score" in car;
  const recCar = car as RecommendedCar;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] w-full max-w-2xl rounded-xl shadow-2xl border border-gray-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#161b22] text-white flex items-start justify-between border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">
                {car.condition} • {car.year}
              </span>
              {isRecommended && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-mono">
                  {recCar.compatibility_score}% AI Match
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {car.brand} {car.model}
            </h3>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              ${car.price.toLocaleString()}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Why recommended if present */}
          {isRecommended && recCar.explanation && (
            <div className="bg-[#161b22] border border-gray-800 rounded-lg p-3.5">
              <h4 className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Explainable AI Recommendation Factors</span>
              </h4>
              <ul className="space-y-1 text-gray-300 text-xs">
                {recCar.explanation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs Grid */}
          <div>
            <h4 className="font-bold text-gray-400 uppercase text-[10px] tracking-wider mb-2.5">
              Vehicle Technical Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Body Style</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.body_type}</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Powertrain / Fuel</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.fuel_type}</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Transmission</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.transmission}</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Drivetrain</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.drive_type}</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Horsepower</span>
                <span className="font-bold text-white text-xs font-mono mt-0.5 block">{car.horsepower} HP</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Displacement</span>
                <span className="font-bold text-white text-xs font-mono mt-0.5 block">{car.engine_cc} cc</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Seating</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.seats} Seats</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Fuel Economy</span>
                <span className="font-bold text-emerald-400 text-xs font-mono mt-0.5 block">{car.fuel_economy} MPG</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Mileage</span>
                <span className="font-bold text-white text-xs font-mono mt-0.5 block">{car.mileage.toLocaleString()} mi</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Reliability</span>
                <span className="font-bold text-emerald-400 text-xs font-mono mt-0.5 block">{car.reliability_score} / 10</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Primary Usage</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{car.usage}</span>
              </div>
              <div className="bg-[#161b22] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-semibold">Location</span>
                <span className="font-bold text-gray-300 text-xs mt-0.5 block">{car.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#161b22] border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-bold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
