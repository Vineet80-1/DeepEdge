import { useEffect, useState } from "react";

export function NetworkPage() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/network-devices")
      .then(res => res.json())
      .then(data => setDevices(data.devices));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Connected Devices</h2>
      {devices.map((d, i) => (
        <div key={i}>
          {d.ip} - {d.mac}
        </div>
      ))}
    </div>
  );
}