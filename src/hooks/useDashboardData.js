import { useEffect, useState } from "react";
import {
  getStats,
  getResources,
  getTraffic,
  getThreats,
  getLogs,
} from "../api/dashboardApi";

export function useDashboardData() {
  const [data, setData] = useState({
    stats: null,
    resources: null,
    traffic: null,
    threats: null,
    logs: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Normalize backend response → frontend-safe
  const normalizeData = (stats, resources, traffic, threats, logs) => ({
    stats: {
      threats: stats?.threats ?? 0,
      events: stats?.events ?? 0,
      uptime: stats?.uptime ?? 0,
      alerts: stats?.alerts ?? 0,
    },
    resources: {
      cpu: resources?.cpu ?? [],
      memory: resources?.memory ?? [],
      network: {
        inbound_current: resources?.network?.inbound_current ?? 0,
        outbound_current: resources?.network?.outbound_current ?? 0,
      },
    },
    traffic: {
      inbound: traffic?.inbound ?? [],
      outbound: traffic?.outbound ?? [],
      protocol_counts: traffic?.protocol_counts ?? {},
    },
    threats: {
      top_attack_sources: threats?.top_attack_sources ?? [],
    },
    logs: logs ?? [],
  });

  const fetchAll = async () => {
    try {
      const [stats, resources, traffic, threats, logs] =
        await Promise.all([
          getStats(),
          getResources(),
          getTraffic(),
          getThreats(),
          getLogs(),
        ]);

      const normalized = normalizeData(
        stats,
        resources,
        traffic,
        threats,
        logs
      );

      setData(normalized);
      setError(null);
    } catch (err) {
      console.error("Dashboard API error:", err);
      setError("⚠ Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();

    const interval = setInterval(fetchAll, 3000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}