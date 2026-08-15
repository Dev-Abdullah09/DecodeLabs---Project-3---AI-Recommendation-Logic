import React from "react";
import { X, BookOpen, Download, CheckCircle2 } from "lucide-react";
import { PROJECT_SOURCE_FILES } from "../data/sourceCodeData";

interface ProjectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectReportModal: React.FC<ProjectReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const reportText = PROJECT_SOURCE_FILES["PROJECT_REPORT.md"] || "";

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([reportText], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "PROJECT_REPORT.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] w-full max-w-4xl rounded-xl shadow-2xl border border-gray-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#161b22] text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                DecodeLabs AI Project 3 — Formal Technical Report
              </h3>
              <p className="text-[11px] text-gray-400">
                Author: Abdullah Zafar • Batch 2026 • AI Recommendation System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 rounded bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download .MD</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Markdown content container */}
        <div className="p-5 overflow-y-auto flex-1 text-gray-200 space-y-4 text-xs leading-relaxed max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-xs text-gray-300 leading-relaxed bg-[#161b22] p-5 rounded-lg border border-gray-800 overflow-x-auto">
            {reportText}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#161b22] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>17 Comprehensive Academic Sections Compliant with DecodeLabs Syllabus</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0d1117] hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-bold rounded-lg transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
