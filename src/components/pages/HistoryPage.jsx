import { useEffect, useState } from "react";

export function HistoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history")
      .then(res => res.json())
      .then(res => setData(res.rows));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Traffic History</h2>
      {data.map((row, i) => (
        <div key={i}>
          {row.source_ip} → {row.destination_ip} [{row.status}]
        </div>
      ))}
    </div>
  );
}