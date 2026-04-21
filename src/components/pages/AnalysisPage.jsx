import { useRef, useState } from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import { Panel } from "../shared/Panel";
import { StatBox } from "../shared/StatBox";

function FileDropCard({
  title,
  subtitle,
  accept,
  accent,
  file,
  onPick,
  onClear,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const nextFile = event.dataTransfer.files?.[0];
    if (nextFile) onPick(nextFile);
  };

  return (
    <div
      style={{
        border: `1px solid ${dragOver ? accent : "rgba(0,255,65,.18)"}`,
        background: dragOver ? "rgba(0,255,65,.08)" : "rgba(0,255,65,.03)",
        padding: 16,
        minHeight: 210,
        transition: "all .2s ease",
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(event) => {
          const nextFile = event.target.files?.[0];
          if (nextFile) onPick(nextFile);
        }}
      />

      <div
        style={{
          color: accent,
          fontSize: ".6rem",
          letterSpacing: ".18em",
          marginBottom: 8,
        }}
        className="font-orb"
      >
        {title}
      </div>

      <div
        style={{
          color: "rgba(0,255,65,.5)",
          fontSize: ".64rem",
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        {subtitle}
      </div>

      {file ? (
        <div
          style={{
            padding: "14px 12px",
            border: `1px solid ${accent}`,
            background: "rgba(0,10,4,.7)",
          }}
        >
          <div
            style={{
              color: "#d7ffe6",
              fontSize: ".72rem",
              marginBottom: 6,
              wordBreak: "break-word",
            }}
          >
            {file.name}
          </div>
          <div
            style={{
              color: "rgba(0,255,65,.45)",
              fontSize: ".6rem",
              marginBottom: 12,
            }}
          >
            {(file.size / 1024).toFixed(1)} KB
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={openPicker}
              className="btn-cyber font-mono"
              style={{
                padding: "8px 12px",
                fontSize: ".58rem",
                letterSpacing: ".12em",
              }}
            >
              REPLACE
            </button>
            <button
              onClick={onClear}
              className="font-mono"
              style={{
                padding: "8px 12px",
                fontSize: ".58rem",
                letterSpacing: ".12em",
                border: "1px solid rgba(255,0,60,.3)",
                background: "rgba(255,0,60,.06)",
                color: "#ff4d6d",
              }}
            >
              CLEAR
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={openPicker}
          style={{
            width: "100%",
            minHeight: 112,
            border: `1px dashed ${dragOver ? accent : "rgba(0,255,65,.25)"}`,
            background: "transparent",
            color: dragOver ? accent : "rgba(0,255,65,.55)",
            letterSpacing: ".14em",
            fontSize: ".64rem",
          }}
          className="font-mono"
        >
          DROP FILE HERE OR CLICK TO BROWSE
        </button>
      )}
    </div>
  );
}

export function AnalysisPage() {
  const { data, loading, error } = useDashboardData();
  const [csvFile, setCsvFile] = useState(null);
  const [pcapFile, setPcapFile] = useState(null);

  if (loading) return <div style={{ color: "#00ff41", padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  const summary = data?.attackSummary || {};
  const memoryStats = summary.memoryStats || {};
  const databaseTotals = summary.databaseTotals || {};
  const recentEvents = summary.recentEvents || [];

  return (
    <div style={{ padding: 20, maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          marginBottom: 18,
        }}
      >
        <div
          className="font-orb"
          style={{
            fontSize: "1rem",
            letterSpacing: ".22em",
            color: "#00ff41",
            marginBottom: 6,
          }}
        >
          FILE ANALYSIS ENGINE
        </div>
        <div
          style={{
            color: "rgba(0,255,65,.48)",
            fontSize: ".66rem",
            letterSpacing: ".08em",
          }}
        >
          Upload inspection files and compare them against the live IDS summary.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <FileDropCard
          title="CSV INGEST"
          subtitle="Upload exported network logs, event records, or threat datasets in CSV format."
          accept=".csv"
          accent="#00f5ff"
          file={csvFile}
          onPick={setCsvFile}
          onClear={() => setCsvFile(null)}
        />

        <FileDropCard
          title="PCAP INGEST"
          subtitle="Upload packet captures for offline inspection and deeper forensic review."
          accept=".pcap,.pcapng"
          accent="#00ff41"
          file={pcapFile}
          onPick={setPcapFile}
          onClear={() => setPcapFile(null)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <StatBox value={memoryStats.attack_count || 0} label="ATTACK COUNT" color="#ff4d6d" />
        <StatBox value={memoryStats.normal_count || 0} label="NORMAL COUNT" color="#00ff41" />
        <StatBox value={memoryStats.risk_score || 0} label="RISK SCORE" color="#00f5ff" />
        <StatBox value={databaseTotals.total_packets || 0} label="DB PACKETS" color="#ffe600" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 1fr) minmax(320px, 1.2fr)",
          gap: 16,
        }}
      >
        <Panel title="Analysis Queue">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "170px 1fr",
              gap: 12,
              color: "#d7ffe6",
              fontSize: ".72rem",
            }}
          >
            <span>CSV Attached</span>
            <span style={{ color: csvFile ? "#00f5ff" : "rgba(0,255,65,.45)" }}>
              {csvFile ? csvFile.name : "NO FILE"}
            </span>
            <span>PCAP Attached</span>
            <span style={{ color: pcapFile ? "#00f5ff" : "rgba(0,255,65,.45)" }}>
              {pcapFile ? pcapFile.name : "NO FILE"}
            </span>
            <span>Sniffer Running</span>
            <span style={{ color: "#00f5ff" }}>{summary.snifferRunning ? "YES" : "NO"}</span>
            <span>Blocked Rate</span>
            <span style={{ color: "#00f5ff" }}>{memoryStats.blocked_rate || 0}%</span>
            <span>Alerts</span>
            <span style={{ color: "#00f5ff" }}>{memoryStats.alerts || 0}</span>
            <span>Observed Nodes</span>
            <span style={{ color: "#00f5ff" }}>{memoryStats.nodes || 0}</span>
          </div>
        </Panel>

        <Panel title="Recent Analysis Signals">
          {recentEvents.length === 0 ? (
            <div style={{ color: "rgba(0,255,65,.55)" }}>No recent analysis signals</div>
          ) : (
            recentEvents.slice(0, 10).map((event, index) => (
              <div
                key={`${event.time || "event"}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 80px 1fr",
                  gap: 10,
                  padding: "8px 10px",
                  borderBottom: "1px solid rgba(0,255,65,.08)",
                  color: "#d7ffe6",
                  fontSize: ".7rem",
                }}
              >
                <span style={{ color: "rgba(0,255,65,.45)" }}>
                  {event.time || "LIVE"}
                </span>
                <span
                  style={{
                    color: event.type === "ALERT" ? "#ff4d6d" : "#00f5ff",
                    letterSpacing: ".12em",
                  }}
                >
                  {event.type || "INFO"}
                </span>
                <span>{event.message || "No message"}</span>
              </div>
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}
