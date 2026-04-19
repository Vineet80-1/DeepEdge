import { useEffect, useState } from "react";
import {
  getStats,
  getResources,
  getTraffic,
  getThreats,
  getLogs,
  getAttackSummary,
} from "../api/dashboardApi";

export function useDashboardData() {
  const [data, setData] = useState({
    stats: null,
    resources: null,
    traffic: null,
    threats: null,
    attackSummary: null,
    logs: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeLogs = (logs) => {
    if (!Array.isArray(logs)) return [];

    return logs.map((log, index) => ({
      id: log?.id ?? `${log?.time ?? "live"}-${index}`,
      time: log?.time ?? null,
      message: log?.message ?? "No message available",
      ip: log?.ip ?? null,
    }));
  };

  const normalizeThreats = (threats) => {
    if (!Array.isArray(threats)) {
      return {
        items: [],
        top_attack_sources: [],
      };
    }

    const items = threats.map((threat, index) => ({
      id: threat?.id ?? `${threat?.label ?? "threat"}-${index}`,
      label: threat?.label ?? "Unknown",
      value: threat?.value ?? 0,
    }));

    return {
      items,
    };
  };

  const normalizeAttackSummary = (attackSummary) => {
    const summary =
      attackSummary?.attack_summary ||
      attackSummary?.summary ||
      attackSummary?.dashboard ||
      attackSummary?.data ||
      attackSummary ||
      {};

    const rawTopSources = Array.isArray(summary?.top_attack_sources)
      ? summary.top_attack_sources
      : Array.isArray(summary)
        ? summary
        : summary?.items || [];

    const topAttackSources = Array.isArray(rawTopSources)
      ? rawTopSources.map((item, index) => ({
          id: item?.id ?? `${item?.ip ?? item?.label ?? "attack"}-${index}`,
          ip: item?.ip ?? null,
          label: item?.label ?? item?.ip ?? item?.name ?? "Unknown",
          value: item?.hits ?? item?.value ?? item?.count ?? item?.total ?? 0,
        }))
      : [];

    const attackCounts = Object.entries(summary?.attack_counts || {}).map(
      ([label, value], index) => ({
        id: `${label}-${index}`,
        label,
        value: Number(value) || 0,
      })
    );

    return {
      raw: summary,
      snifferRunning: Boolean(summary?.sniffer_running),
      memoryStats: summary?.memory_stats || {},
      databaseTotals: summary?.database_totals || {},
      protocolCounts: summary?.protocol_counts || {},
      recentEvents: Array.isArray(summary?.recent_events)
        ? summary.recent_events
        : [],
      attackCounts,
      topAttackSources,
    };
  };

  const normalizeData = (
    stats,
    resources,
    traffic,
    threats,
    attackSummary,
    logs
  ) => ({
    stats: {
      threats: stats?.threats ?? 0,
      events: stats?.events ?? 0,
      uptime: stats?.uptime ?? 0,
      alerts: stats?.alerts ?? 0,
      risk_score: stats?.risk_score ?? 0,
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
    threats: normalizeThreats(threats),
    attackSummary: normalizeAttackSummary(attackSummary),
    logs: normalizeLogs(logs),
  });

  const fetchAll = async () => {
    try {
      const [stats, resources, traffic, threats, attackSummary, logs] = await Promise.all([
        getStats(),
        getResources(),
        getTraffic(),
        getThreats(),
        getAttackSummary(),
        getLogs(),
      ]);

      setData(
        normalizeData(stats, resources, traffic, threats, attackSummary, logs)
      );
      setError(null);
    } catch (err) {
      console.error("Dashboard API error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();

    const interval = setInterval(fetchAll, 3000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
