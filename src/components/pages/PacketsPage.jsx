import { useEffect, useState } from "react";
import { Panel } from "../shared/Panel";

export function PacketsPage() {
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPackets = () => {
      fetch("http://127.0.0.1:8000/api/packets")
        .then((res) => res.json())
        .then((data) => {
          setPackets(data?.packets || []);
          setError("");
        })
        .catch(() => setError("Failed to load packets"))
        .finally(() => setLoading(false));
    };

    loadPackets();
    const interval = setInterval(loadPackets, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ color: "#00ff41", padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  return (
    <div style={{ padding: 20, maxWidth: 1300, margin: "0 auto" }}>
      <Panel title="Live Packets">
        {packets.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No packets available</div>
        ) : (
          packets.map((packet, i) => (
            <div
              key={`${packet.src_ip || "pkt"}-${packet.dst_ip || i}-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto auto",
                gap: 10,
                padding: "8px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
                alignItems: "center",
              }}
            >
              <span>{packet.src_ip || "Unknown"}</span>
              <span style={{ color: "#00f5ff" }}>{"->"}</span>
              <span>{packet.dst_ip || "Unknown"}</span>
              <span style={{ color: "#00f5ff" }}>{packet.protocol || "UNK"}</span>
              <span style={{ color: "rgba(0,255,65,.7)" }}>{packet.status || "N/A"}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
