"use client";

interface JobDescriptionFormProps {
  value: string;
  onChange: (text: string) => void;
  maxChars?: number;
}

export default function JobDescriptionForm({
  value,
  onChange,
  maxChars = 500,
}: JobDescriptionFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) onChange(e.target.value);
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Enter job description here..."
        rows={6}
        style={{ width: "100%" }}
      />
      <div>
        {value.length} / {maxChars}
      </div>
    </div>
  );
}