export type MultiStepFormProps = {
  steps: React.ReactNode[];
  onStepSubmit?: (stepIndex: number) => void;
}
export type ResumeUploadProps = { onUpload?: (file: File) => void; }