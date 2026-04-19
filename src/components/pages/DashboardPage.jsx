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
  const logs = data?.logs || [];

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 12,
        marginBottom: 20
      }}>
        <StatBox value={stats.threats || 0} label="THREATS" />
        <StatBox value={stats.events || 0} label="EVENTS" />
        <StatBox value={stats.alerts || 0} label="ALERTS" />
        <StatBox value={stats.risk_score || 0} label="RISK" />
      </div>

      {/* CHARTS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: 16,
        marginBottom: 20
      }}>
        <Panel title="Network Traffic">
          <TrafficChart
            data1={traffic.inbound || []}
            data2={traffic.outbound || []}
          />
        </Panel>

        <Panel title="Threat Types">
          <BarChart data={threats || {}} />
        </Panel>
      </div>

      {/* LOWER SECTION */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16
      }}>

        <Panel title="Logs">
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {logs.length === 0 ? "No logs" :
              logs.slice(0, 20).map((log, i) => (
                <div key={i}>
                  [{log.timestamp}] {log.source_ip} → {log.status}
                </div>
              ))
            }
          </div>
        </Panel>

        <Panel title="Top Attack Sources">
          {(threats.top_attack_sources || []).map((s, i) => (
            <div key={i}>
              {s.label} ({s.value})
            </div>
          ))}
        </Panel>

        <Panel title="Protocols">
          {traffic.protocol_counts
            ? Object.entries(traffic.protocol_counts).map(([k, v]) => (
              <div key={k}>{k}: {v}</div>
            ))
            : "No protocol data"}
        </Panel>




        <Panel title="Processor">
          {(resources.cpu || []).map((v, i) => (
            <ProgBar
              key={i}
              label={`CORE-${i + 1}`}
              value={v}
              color="#00f5ff"
            />
          ))}
        </Panel>

        <Panel title="Memory">
          {(resources.memory || []).map((v, i) => (
            <ProgBar
              key={i}
              label={`MEM-${i + 1}`}
              value={v}
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