"use client";

import { useState } from "react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  steps: React.ReactNode[];
  onFinish?: () => void;
};
export default function MultiStepForm({ steps, onFinish }: Props) {
  const { step, next, back, currentStepIndex } = useMultiStepForm(steps);
  const [loading, setLoading] = useState(false);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleFinish = async () => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500)); // Simülasyon
      toast.success("Form successfully submitted!"); // Toast burada
      console.log("Form workflow finished!");
      if (onFinish) onFinish();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>{step}</div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        {!isFirstStep ? (
          <button onClick={back} disabled={loading} style={{ marginRight: "auto" }}>
            Back
          </button>
        ) : (
          <div />
        )}

        {!isLastStep ? (
          <button onClick={next} disabled={loading} style={{ marginLeft: "auto" }}>
            Next
          </button>
        ) : (
          <button onClick={handleFinish} disabled={loading} style={{ marginLeft: "auto" }}>
            Finish
          </button>
        )}
      </div>

    </div>
  );
}