import { useDashboardData } from "../../hooks/useDashboardData";
import { Panel } from "../shared/Panel";

export function ThreatsPage() {
  const { data, loading } = useDashboardData();

  if (loading) return <div>Loading...</div>;

  const { threats } = data;

  return (
    <div style={{ padding: 20 }}>
      <Panel title="Recent Threats">
        {threats.recent_threats.map((t, i) => (
          <div key={i}>
            {t.source_ip} → {t.destination_ip} [{t.attack_type}]
          </div>
        ))}
      </Panel>
    </div>
  );
}