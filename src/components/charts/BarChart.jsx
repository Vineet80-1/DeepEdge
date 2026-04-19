const BAR_COLORS = [
  "#ff003c",
  "#ff8c00",
  "#ffe600",
  "#cc00ff",
  "#00f5ff",
  "#00ff41",
  "#ff4d6d",
  "#6eff8f",
];

export function BarChart({ data = [] }) {
  const bars = Array.isArray(data) ? data : data?.items || [];

  if (bars.length === 0) {
    return (
      <div style={{ color: "rgba(0,255,65,.55)", fontSize: ".72rem" }}>
        No threat data
      </div>
    );
  }

  const maxValue = Math.max(...bars.map((bar) => bar.value || 0), 1);

  return (
    <div className="flex items-end gap-[5px]" style={{ height: 150 }}>
      {bars.map((bar, index) => {
        const color = BAR_COLORS[index % BAR_COLORS.length];

        return (
          <div
            key={bar.id || `${bar.label}-${index}`}
            className="flex-1 flex flex-col items-center gap-[4px]"
          >
            <div className="text-[.56rem]" style={{ color: "#00f5ff" }}>
              {bar.value}
            </div>
            <div
              className="w-full rounded-sm transition-all duration-500 hover:opacity-80"
              style={{
                height: `${Math.max((bar.value / maxValue) * 104, 10)}px`,
                background: color,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
            <div
              className="text-[.5rem] tracking-widest mt-1 text-center"
              style={{
                color: "rgba(0,255,65,.75)",
                wordBreak: "break-word",
                maxWidth: "100%",
              }}
            >
              {bar.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
