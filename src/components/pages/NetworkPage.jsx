import { useEffect, useState } from "react";
import { Panel } from "../shared/Panel";

export function NetworkPage() {
  const [devices, setDevices] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/network-devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data?.devices || data?.network_devices || []);
        setCommunications(data?.communications || []);
        setError("");
      })
      .catch(() => setError("Failed to load network devices"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#00ff41", padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 1300,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        gap: 16,
      }}
    >
      <Panel title="Connected Devices">
        {devices.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No devices discovered</div>
        ) : (
          devices.map((device, i) => (
            <div
              key={`${device.ip || "device"}-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                padding: "8px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
              }}
            >
              <span>{device.ip || device.address || "Unknown IP"}</span>
              <span style={{ color: "#00f5ff" }}>{device.mac || device.vendor || "Unknown"}</span>
            </div>
          ))
        )}
      </Panel>

      <Panel title="Communications">
        {communications.length === 0 ? (
          <div style={{ color: "rgba(0,255,65,.55)" }}>No communications available</div>
        ) : (
          communications.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: 10,
                padding: "8px 10px",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: "#d7ffe6",
                fontSize: ".72rem",
              }}
            >
              <span>{row.source || row.src || row.from || "Unknown"}</span>
              <span style={{ color: "#00f5ff" }}>{"->"}</span>
              <span>{row.destination || row.dst || row.to || "Unknown"}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
