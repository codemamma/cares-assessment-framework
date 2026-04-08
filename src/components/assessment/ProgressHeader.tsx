"use client";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  categoryLabel: string;
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  categoryLabel,
}: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            CARES Assessment
          </span>
          <span className="text-xs font-medium text-gray-500">
            Section {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-purple-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-semibold text-gray-800">{categoryLabel}</p>
      </div>
    </div>
  );
}
