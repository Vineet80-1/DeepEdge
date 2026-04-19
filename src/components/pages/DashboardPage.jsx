import { useEffect } from "react";
import { useDashboardData } from "../../hooks/useDashboardData";

import { StatBox } from "../shared/StatBox";
import { Panel } from "../shared/Panel";
import { ProgBar } from "../shared/ProgBar";
import { TrafficChart } from "../charts/TrafficChart";
import { BarChart } from "../charts/BarChart";

export function DashboardPage({ setStats }) {
  const { data, loading, error } = useDashboardData();
  const stats = data?.stats || {};

  useEffect(() => {
    if (setStats) setStats(stats);
  }, [stats, setStats]);

  if (loading) return <div style={{ color: "#00ff41" }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div>No data available</div>;

  const resources = data.resources || {};
  const traffic = data.traffic || {};
  const threats = data.threats || {};
  const attackSummary = data.attackSummary || {};
  const topAttackSources =
    attackSummary.topAttackSources ||
    attackSummary.raw?.top_attack_sources ||
    [];
  const protocolCounts =
    Object.keys(traffic.protocol_counts || {}).length > 0
      ? traffic.protocol_counts
      : attackSummary.protocolCounts ||
        attackSummary.raw?.protocol_counts ||
        {};
  const logs = data.logs || [];

  const getLogTone = (message = "") => {
    const normalized = message.toLowerCase();

    if (
      normalized.includes("detected") ||
      normalized.includes("flood") ||
      normalized.includes("attack")
    ) {
      return { accent: "#ff4d6d", badge: "ALERT" };
    }

    return { accent: "#00f5ff", badge: "INFO" };
  };

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <StatBox value={stats.threats || 0} label="THREATS" />
        <StatBox value={stats.events || 0} label="EVENTS" />
        <StatBox value={stats.alerts || 0} label="ALERTS" />
        <StatBox value={stats.risk_score || 0} label="RISK" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Panel title="Network Traffic">
          <TrafficChart
            data1={traffic.inbound || []}
            data2={traffic.outbound || []}
          />
        </Panel>

        <Panel title="Threat Types">
          <BarChart data={threats.items || []} />
        </Panel>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        <Panel title="Logs">
          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              display: "grid",
              gap: 10,
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: "rgba(0,255,65,.55)" }}>No logs</div>
            ) : (
              logs.slice(0, 20).map((log) => {
                const tone = getLogTone(log.message);

                return (
                  <div
                    key={log.id}
                    style={{
                      padding: "10px 12px",
                      background: "rgba(0,10,4,.75)",
                      border: "1px solid rgba(0,255,65,.12)",
                      borderLeft: `3px solid ${tone.accent}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        className="font-orb"
                        style={{
                          fontSize: ".58rem",
                          letterSpacing: ".18em",
                          color: tone.accent,
                        }}
                      >
                        {tone.badge}
                      </span>
                      <span
                        style={{
                          fontSize: ".58rem",
                          color: "rgba(0,255,65,.45)",
                        }}
                      >
                        {log.time || "LIVE EVENT"}
                      </span>
                    </div>

                    <div
                      style={{
                        color: "#d7ffe6",
                        fontSize: ".72rem",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {log.message}
                    </div>

                    {log.ip && (
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: ".58rem",
                          color: "rgba(0,245,255,.75)",
                          letterSpacing: ".12em",
                        }}
                      >
                        SOURCE: {log.ip}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Panel>

        <Panel title="Top Attack Sources">
          {topAttackSources.length === 0 ? (
            <div style={{ color: "rgba(0,255,65,.55)" }}>No attack source data</div>
          ) : (
            topAttackSources.map((source, i) => (
              <div
                key={source.id || i}
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
                <span>{source.ip || source.label || "Unknown"}</span>
                <span style={{ color: "#00f5ff" }}>{source.value || 0}</span>
              </div>
            ))
          )}
        </Panel>

        <Panel title="Protocols">
          {Object.keys(protocolCounts).length > 0
            ? Object.entries(protocolCounts).map(([key, value]) => (
                <div
                  key={key}
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
                  <span>{key}</span>
                  <span style={{ color: "#00f5ff" }}>{value}</span>
                </div>
              ))
            : "No protocol data"}
        </Panel>

        <Panel title="Processor">
          {(resources.cpu || []).map((value, i) => (
            <ProgBar
              key={i}
              label={`CORE-${i + 1}`}
              value={value}
              color="#00f5ff"
            />
          ))}
        </Panel>

        <Panel title="Memory">
          {(resources.memory || []).map((value, i) => (
            <ProgBar
              key={i}
              label={`MEM-${i + 1}`}
              value={value}
              color="#00ff41"
            />
          ))}
        </Panel>

        <Panel title="Network I/O">
          <ProgBar
            label="INBOUND"
            value={resources.network?.inbound_current || 0}
            color="#ff8c00"
          />
          <ProgBar
            label="OUTBOUND"
            value={resources.network?.outbound_current || 0}
            color="#ff8c00"
          />
        </Panel>
      </div>
    </div>
  );
}
