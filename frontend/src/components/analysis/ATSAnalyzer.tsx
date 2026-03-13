import { useState } from "react";
import axios from "axios";

export default function ATSAnalyzer() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<{ score: number; missingKeywords: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/analysis", {
        resume,
        jobDescription: jobDesc,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult(null);
      alert("Backend error. Check console.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>ATS Keyword Analyzer</h2>
      <textarea
        placeholder="Paste your Resume text here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <textarea
        placeholder="Paste Job Description here"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={analyze} disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>ATS Match Score: {result.score}%</h3>
          {result.missingKeywords.length > 0 ? (
            <>
              <h4>Missing Keywords:</h4>
              <ul>
                {result.missingKeywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>All keywords matched!</p>
          )}
        </div>
      )}
    </div>
  );
}