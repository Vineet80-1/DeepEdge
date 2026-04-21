import { useEffect, useState } from "react";
import { Panel } from "../shared/Panel";

export function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setRows(data?.rows || []);
        setError("");
      })
      .catch(() => setError("Failed to load history"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#00ff41", padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  return (
    <div style={{ padding: 20, maxWidth: 1300, margin: "0 auto" }}>
      <Panel title="Traffic History">
        {rows.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No history available</div>
        ) : (
          rows.map((row, i) => (
            <div
              key={`${row.id || "row"}-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr auto 1fr auto",
                gap: 10,
                padding: "8px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
                alignItems: "center",
              }}
            >
              <span style={{ color: "rgba(0,255,65,.5)" }}>
                {row.timestamp || row.time || "RECORDED"}
              </span>
              <span>{row.source_ip || row.src_ip || "Unknown"}</span>
              <span style={{ color: "#00f5ff" }}>{"->"}</span>
              <span>{row.destination_ip || row.dst_ip || "Unknown"}</span>
              <span style={{ color: "rgba(0,255,65,.7)" }}>{row.status || "N/A"}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
