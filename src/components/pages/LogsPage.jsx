import { useDashboardData } from "../../hooks/useDashboardData";
import { Panel } from "../shared/Panel";

export function LogsPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div style={{ color: "#00ff41", padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  const logs = data?.logs || [];

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <Panel title="System Logs">
        {logs.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No logs available</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 12,
                padding: "9px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
              }}
            >
              <span style={{ color: "rgba(0,255,65,.5)" }}>
                {log.time || "LIVE EVENT"}
              </span>
              <span>{log.message}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
