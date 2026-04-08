"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { assessmentCategories } from "@/data/caresQuestions";
import { isCategoryComplete } from "@/lib/scoring";
import {
  saveAssessmentResponses,
  loadAssessmentResponses,
  saveCurrentStep,
  loadCurrentStep,
} from "@/lib/storage";
import { AssessmentResponses } from "@/types/assessment";
import { ProgressHeader } from "./ProgressHeader";
import { CategorySection } from "./CategorySection";
import { NavigationControls } from "./NavigationControls";

export function AssessmentShell() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = loadAssessmentResponses();
    const savedStep = loadCurrentStep();
    setResponses(saved);
    setCurrentStep(savedStep);
    setMounted(true);
  }, []);

  const category = assessmentCategories[currentStep];
  const isLast = currentStep === assessmentCategories.length - 1;
  const isFirst = currentStep === 0;
  const canProceed = isCategoryComplete(category.key, responses);

  function handleAnswer(questionId: string, value: number) {
    const updated = { ...responses, [questionId]: value };
    setResponses(updated);
    saveAssessmentResponses(updated);
  }

  function handleNext() {
    if (!canProceed) return;
    if (isLast) {
      router.push("/results");
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      saveCurrentStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrevious() {
    if (isFirst) return;
    const prev = currentStep - 1;
    setCurrentStep(prev);
    saveCurrentStep(prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressHeader
        currentStep={currentStep + 1}
        totalSteps={assessmentCategories.length}
        categoryLabel={category.label}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <CategorySection
          category={category}
          responses={responses}
          onAnswer={handleAnswer}
        />
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={isFirst}
          isLast={isLast}
          canProceed={canProceed}
        />
      </div>
    </div>
  );
}
