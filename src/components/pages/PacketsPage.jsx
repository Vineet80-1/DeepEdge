import { useEffect, useState } from "react";

export function PacketsPage() {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/api/packets")
        .then((res) => res.json())
        .then((data) => setPackets(data.packets || []));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Packets</h2>
      {packets.map((packet, i) => (
        <div key={i}>
          {packet.src_ip} {"->"} {packet.dst_ip} [{packet.protocol}]{" "}
          {packet.status}
        </div>
      ))}
    </div>
  );
}
