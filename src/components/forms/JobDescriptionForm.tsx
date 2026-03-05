"use client";

import { useJobDescriptionForm } from "@/hooks/useJobDescriptionForm";
import { Toaster, toast } from "react-hot-toast";

export default function JobDescriptionForm() {
  const { value, error, handleChange, maxChars } = useJobDescriptionForm();

  const handleBlur = () => {
    if (!value) toast.error("Job description cannot be empty");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter job description here..."
        rows={6}
        style={{ padding: 10, borderRadius: 8, border: "1px solid gray", resize: "vertical" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{value.length} / {maxChars}</span>
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </div>
  );
}