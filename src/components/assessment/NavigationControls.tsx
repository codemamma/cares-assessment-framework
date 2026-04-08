"use client";

import { Button } from "@/components/shared/Button";

interface NavigationControlsProps {
  onPrevious?: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  isFirst,
  isLast,
  canProceed,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
      {!isFirst ? (
        <Button variant="ghost" onClick={onPrevious} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          ← Previous
        </Button>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-3">
        {!canProceed && (
          <p className="text-xs text-amber-600 font-medium">
            Rate all 5 behaviors to continue
          </p>
        )}
        <Button onClick={onNext} disabled={!canProceed} size="md">
          {isLast ? "View My Results" : "Continue →"}
        </Button>
      </div>
    </div>
  );
}
