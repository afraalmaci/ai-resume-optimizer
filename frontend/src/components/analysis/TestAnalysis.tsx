"use client";

import { useEffect, useState } from "react";
import { SkeletonLoader } from "../ui/SkeletonLoader";

interface TestAnalysisProps {
  resumeFile: File | null;
  jobDescription: string;
}

interface AnalysisResult {
  score: number;
  feedback: string;
  missingKeywords: string[];
}

export default function TestAnalysis({
  resumeFile,
  jobDescription,
}: TestAnalysisProps) {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeFile || !jobDescription) return;

    const analyzeResume = async () => {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      try {
        const res = await fetch("http://localhost:3001/analysis", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.statusText}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    analyzeResume();
  }, [resumeFile, jobDescription]);

  if (!resumeFile || !jobDescription) {
    return <p>Please upload your resume and enter job description to analyze.</p>;
  }

  if (loading) return <SkeletonLoader />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h2>Analysis Result</h2>
      <p>Score: {data?.score}</p>
      <p>Feedback: {data?.feedback}</p>
      <p>Missing Keywords: {data?.missingKeywords.join(", ")}</p>
    </div>
  );
}