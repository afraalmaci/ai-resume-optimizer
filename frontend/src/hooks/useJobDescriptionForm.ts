"use client";

import { useState } from "react";

export function useJobDescriptionForm(maxChars: number = 500) {
  const [error, setError] = useState<string | null>(null);

  const validate = (text: string) => {
    if (text.length > maxChars) setError(`Maximum ${maxChars} characters allowed`);
    else setError(null);
  };

  return { error, maxChars, validate };
}