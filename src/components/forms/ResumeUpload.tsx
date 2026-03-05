"use client";

import { useResumeUpload } from "@/hooks/useResumeUpload";
import styles from "@/styles/ResumeUpload.module.css";
import { Toaster } from "react-hot-toast";

export default function ResumeUpload() {
  const { file, loading, removeFile, getRootProps, getInputProps, isDragActive } =
    useResumeUpload();

  return (
    <div>
      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        <input {...getInputProps()} disabled={loading} />
        {loading ? (
          <p>Loading...</p>
        ) : isDragActive ? (
          <p>Drop the PDF here ...</p>
        ) : file ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag & drop your resume here, or click to select PDF</p>
        )}
      </div>

      {/* File info + remove */}
      {file && !loading && (
        <div className={styles.fileInfo}>
          <span>{file.name}</span>
          <button className={styles.removeButton} onClick={removeFile}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}