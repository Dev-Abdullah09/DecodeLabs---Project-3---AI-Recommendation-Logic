import React, { useState } from "react";
import { FileCode2, Copy, Check, Download, ExternalLink } from "lucide-react";
import { PROJECT_SOURCE_FILES } from "../data/sourceCodeData";

export const SourceCodeViewer: React.FC = () => {
  const fileKeys = Object.keys(PROJECT_SOURCE_FILES);
  const [selectedFile, setSelectedFile] = useState<string>(fileKeys[0]);
  const [copied, setCopied] = useState(false);

  const currentContent = PROJECT_SOURCE_FILES[selectedFile] || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([currentContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = selectedFile.split("/").pop() || "source_code.py";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#0d1117] rounded-xl border border-gray-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* File Sidebar */}
      <div className="w-full md:w-72 bg-[#161b22] text-gray-300 p-4 border-r border-gray-800 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Python Source Explorer</span>
          </div>

          <div className="text-[10px] text-gray-400">
            Select any file to inspect full clean source code:
          </div>

          <div className="space-y-1">
            {fileKeys.map((file) => {
              const isSelected = selectedFile === file;
              return (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-600 text-white font-bold"
                      : "hover:bg-[#0d1117] text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="truncate">{file}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-gray-800 text-[10px] text-gray-500 font-mono">
          DecodeLabs Batch 2026 • Abdullah Zafar
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 flex flex-col bg-[#050608] text-gray-100 overflow-hidden">
        {/* File toolbar */}
        <div className="px-4 py-2.5 bg-[#0d1117] border-b border-gray-800 flex items-center justify-between">
          <div className="font-mono text-xs font-bold text-blue-400 truncate">
            {selectedFile}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-[#161b22] hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <pre className="p-5 text-xs font-mono overflow-auto flex-1 text-gray-300 leading-relaxed selection:bg-blue-800">
          <code>{currentContent}</code>
        </pre>
      </div>
    </div>
  );
};
