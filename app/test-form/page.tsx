"use client";

import MultiStepForm from "@/components/forms/MultiStepForm";
import ResumeUpload from "@/components/forms/ResumeUpload";
import JobDescriptionForm from "@/components/forms/JobDescriptionForm";
import { Toaster } from "react-hot-toast";

export default function TestFormPage() {
  const steps = [
    <ResumeUpload key="resume" />,
    <JobDescriptionForm key="job" />,
    <div key="result">Analysis Step (Preview / Result)</div>,
  ];

  const handleFinish = () => {
    console.log("Form workflow finished!");
  };

  return (
    <main style={{ padding: 50 }}>
      <h1>Multi-Step Form Test</h1>
      <MultiStepForm steps={steps} onFinish={handleFinish} />
      <Toaster position="top-right" />
    </main>
  );
}