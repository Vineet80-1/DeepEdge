import { useDashboardData } from "../../hooks/useDashboardData";
import { Panel } from "../shared/Panel";

export function ThreatsPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div style={{ color: "#00ff41" }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div style={{ color: "#00ff41" }}>No threat data available</div>;

  const threatItems = data?.threats?.items || [];

  return (
    <div style={{ padding: 20 }}>
      <Panel title="Threat Breakdown">
        {threatItems.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No threat data</div>
        ) : (
          threatItems.map((threat) => (
            <div
              key={threat.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: "8px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
              }}
            >
              <span>{threat.label}</span>
              <span style={{ color: "#00f5ff" }}>{threat.value}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
