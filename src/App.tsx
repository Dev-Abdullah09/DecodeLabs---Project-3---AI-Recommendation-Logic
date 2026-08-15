import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PreferenceForm } from "./components/PreferenceForm";
import { RecommendationResults } from "./components/RecommendationResults";
import { HowAiDecided } from "./components/HowAiDecided";
import { ComparisonModal } from "./components/ComparisonModal";
import { CatalogExplorer } from "./components/CatalogExplorer";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { EvaluationRunner } from "./components/EvaluationRunner";
import { SourceCodeViewer } from "./components/SourceCodeViewer";
import { ProjectReportModal } from "./components/ProjectReportModal";
import { CarDetailModal } from "./components/CarDetailModal";
import { UserPreferences, RecommendationResponse, Car, RecommendedCar } from "./types";
import { recommendCars } from "./utils/recommendationLogic";
import { CARS_DATASET } from "./data/carsData";

const DEFAULT_PREFERENCES: UserPreferences = {
  min_budget: 20000,
  max_budget: 45000,
  brand: "Any",
  body_type: "SUV",
  fuel_type: "Hybrid",
  transmission: "Automatic",
  max_mileage: 35000,
  engine_cc: 2000,
  min_horsepower: 180,
  seats: 5,
  drive_type: "AWD",
  usage: "Family",
  priority: "Budget",
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>("recommend");
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [response, setResponse] = useState<RecommendationResponse>(() =>
    recommendCars(DEFAULT_PREFERENCES, CARS_DATASET, 6)
  );
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [detailCar, setDetailCar] = useState<Car | RecommendedCar | null>(null);

  // Compute recommendations on demand or on preferences change
  const handleComputeRecommendations = () => {
    const res = recommendCars(preferences, CARS_DATASET, 6);
    setResponse(res);
  };

  const handleSelectPreset = (presetPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...presetPrefs };
    setPreferences(updated);
    const res = recommendCars(updated, CARS_DATASET, 6);
    setResponse(res);
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    const res = recommendCars(DEFAULT_PREFERENCES, CARS_DATASET, 6);
    setResponse(res);
  };

  const handleToggleCompare = (carId: number) => {
    setSelectedForCompare((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleRemoveCompareCar = (carId: number) => {
    setSelectedForCompare((prev) => prev.filter((id) => id !== carId));
  };

  const scrollToForm = () => {
    setActiveTab("recommend");
    const el = document.getElementById("preference-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const comparedCars = CARS_DATASET.filter((c) => selectedForCompare.includes(c.id));

  return (
    <div className="min-h-screen bg-[#050608] text-gray-200 flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={selectedForCompare.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === "recommend" && (
          <div>
            <HeroSection
              onSelectPreset={handleSelectPreset}
              onScrollToForm={scrollToForm}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              {/* Preference Form */}
              <PreferenceForm
                preferences={preferences}
                onChange={(newPrefs) => {
                  setPreferences(newPrefs);
                  const res = recommendCars(newPrefs, CARS_DATASET, 6);
                  setResponse(res);
                }}
                onSubmit={handleComputeRecommendations}
                onReset={handleResetPreferences}
              />

              {/* Recommendation Results */}
              <RecommendationResults
                response={response}
                selectedForCompare={selectedForCompare}
                onToggleCompare={handleToggleCompare}
                onOpenCompareModal={() => setIsCompareModalOpen(true)}
                onViewDetails={(car) => setDetailCar(car)}
              />
            </div>
          </div>
        )}

        {activeTab === "how-it-works" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HowAiDecided response={response} />
          </div>
        )}

        {activeTab === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CatalogExplorer
              onSelectCarForCompare={handleToggleCompare}
              selectedForCompare={selectedForCompare}
              onViewDetails={(car) => setDetailCar(car)}
            />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnalyticsDashboard />
          </div>
        )}

        {activeTab === "tests" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <EvaluationRunner />
          </div>
        )}

        {activeTab === "code" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SourceCodeViewer />
          </div>
        )}
      </main>

      {/* Modals */}
      <ComparisonModal
        cars={comparedCars}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveCar={handleRemoveCompareCar}
      />

      <ProjectReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <CarDetailModal
        car={detailCar}
        isOpen={!!detailCar}
        onClose={() => setDetailCar(null)}
      />

      {/* Footer */}
      <footer className="bg-[#0d1117] text-gray-400 border-t border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500">
            <div className="flex items-center gap-3">
              <div className="text-white font-bold text-xs tracking-tight">
                AutoMatch <span className="text-blue-500">AI</span> Engine v1.0.4
              </div>
              <span className="text-gray-700">|</span>
              <div>DecodeLabs Project 3</div>
            </div>
            <div>
              Batch 2026 • Abdullah Zafar • All Rights Reserved
            </div>
            <div className="flex items-center gap-3 uppercase tracking-wider text-[9px]">
              <span>Status: Operational</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
