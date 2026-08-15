import React from "react";
import { Sparkles, Car, BarChart3, Database, FileCode2, BookOpen, GitCompare } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  onOpenCompare,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050608]/95 backdrop-blur-md border-b border-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo & DecodeLabs Tag */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("recommend")}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  AutoMatch <span className="text-blue-500">AI</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded">
                  Project 3
                </span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                Intelligent Car Recommendations • Abdullah Zafar
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-recommend-tab"
              onClick={() => setActiveTab("recommend")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "recommend"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              id="nav-how-it-works-tab"
              onClick={() => setActiveTab("how-it-works")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "how-it-works"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              System Architecture
            </button>

            <button
              id="nav-catalog-tab"
              onClick={() => setActiveTab("catalog")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "catalog"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Dataset (185)
            </button>

            <button
              id="nav-analytics-tab"
              onClick={() => setActiveTab("analytics")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "analytics"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>

            <button
              id="nav-tests-tab"
              onClick={() => setActiveTab("tests")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "tests"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              Tests & Benchmark
            </button>

            <button
              id="nav-code-tab"
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "code"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161b22]"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              Code
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {compareCount > 0 && (
              <button
                id="header-compare-btn"
                onClick={onOpenCompare}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-sm transition-all"
              >
                <GitCompare className="w-3.5 h-3.5" />
                Compare ({compareCount})
              </button>
            )}

            <button
              id="header-report-btn"
              onClick={onOpenReport}
              className="px-2.5 py-1 bg-[#161b22] hover:bg-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded border border-gray-700 flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Project</span> Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
