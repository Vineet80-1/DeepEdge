export function Panel({ title, children, className = "", style = {} }) {
  return (
    <div
      className={`relative overflow-hidden scanline ${className}`}
      style={{
        background: "rgba(0,18,4,0.88)",
        border: "1px solid rgba(0,255,65,.22)",
        borderRadius: 2,
        padding: 14,
        borderRadius: 6,
        animation: "border-glow 4s ease infinite",
        ...style,
      }}
    >
      <div className="p-3 pb-0">
        <div
          className="font-orb text-[.56rem] tracking-[.22em] uppercase pb-2 mb-3"
          style={{ color: "#00f5ff", borderBottom: "1px solid rgba(0,255,65,.18)" }}
        >
          <span style={{ color: "#00ff41" }}>■ </span>
          {title}
        </div>
      </div>
      <div className="px-3 pb-3">{children}</div>
    </div>
  );
}
