import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "threats", label: "Threats" },
  { id: "network", label: "Network" },
  { id: "packets", label: "Packets" },
  { id: "history", label: "History" },
  { id: "logs", label: "Logs" },
  { id: "analysis", label: "File Analysis" },
];

export function Navbar({ page, navigate, authed, setAuthed, stats }) {
  const [clock, setClock] = useState(new Date().toTimeString().slice(0, 8));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setClock(new Date().toTimeString().slice(0, 8)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      className="font-mono"
      style={{
        background: "rgba(0,6,0,.97)",
        borderBottom: "1px solid rgba(0,255,65,.18)",
        position: "relative",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <button
          onClick={() => navigate("dashboard")}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span
            className="font-orb glitch"
            style={{
              fontSize: "1.1rem",
              fontWeight: 900,
              letterSpacing: ".25em",
              color: "#00ff41",
              textShadow: "0 0 14px #00ff41",
            }}
          >
            NEXUS
            <span style={{ color: "#00f5ff" }}>//</span>
            SEC
          </span>
        </button>

        <div
          style={{ display: "flex", gap: 2, alignItems: "center" }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                if (!authed && n.id !== "dashboard" && n.id !== "analysis") {
                  setPage("login");
                } else {
                  setPage(n.id);
                }
              }}
              className={`nav-link ${page === n.id ? "active" : ""}`}
              style={{
                background: "none",
                border: "none",
                padding: "6px 14px",
                fontSize: ".68rem",
                letterSpacing: ".15em",
                fontFamily: "'Share Tech Mono',monospace",
              }}
            >
              {page === n.id && (
                <span style={{ color: "#00f5ff", marginRight: 4 }}>■</span>
              )}
              {n.label.toUpperCase()}
            </button>
          ))}
          {authed && (
            <button
              onClick={() => {
                setAuthed(false);
                setPage("login");
              }}
              style={{
                marginLeft: 8,
                padding: "4px 12px",
                fontSize: ".6rem",
                letterSpacing: ".12em",
                border: "1px solid rgba(255,0,60,.4)",
                color: "#ff003c",
                background: "rgba(255,0,60,.07)",
                fontFamily: "'Share Tech Mono',monospace",
              }}
            >
              LOGOUT
            </button>
          )}
        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        ><button
          className="mobile-only"
          onClick={() => setMobileOpen((open) => !open)}
          style={{
            background: "none",
            border: "1px solid rgba(0,255,65,.3)",
            color: "#00ff41",
            padding: "4px 10px",
            fontSize: "12px",
          }}
        >
            MENU
          </button>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: ".62rem",
              letterSpacing: ".08em",
            }}
          >
            {[
              { c: "#00ff41", l: "SECURE" },
              { c: "#ff003c", l: `${stats?.alerts || 0} ALERTS`, d: ".5s" },
              { c: "#00f5ff", l: "ONLINE", d: "1s" },
            ].map(({ c, l, d = "0s" }) => (
              <span
                key={l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: c,
                    boxShadow: `0 0 5px ${c}`,
                    animation: `pdot 1.5s ${d} infinite`,
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "rgba(0,255,65,.55)" }}>{l}</span>
              </span>
            ))}
          </div>
          <span
            className="font-orb"
            style={{
              fontSize: ".78rem",
              color: "#00f5ff",
              textShadow: "0 0 7px #00f5ff",
            }}
          >
            {clock}
          </span>
          {authed && (
            <span
              style={{
                fontSize: ".58rem",
                padding: "2px 8px",
                border: "1px solid rgba(0,255,65,.3)",
                color: "#00ff41",
                letterSpacing: ".1em",
              }}
            >
              AUTH
            </span>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "rgba(0,10,0,.98)",
            borderTop: "1px solid rgba(0,255,65,.2)",
            zIndex: 100,
            boxShadow: "0 10px 20px rgba(0,0,0,.6)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (!authed && item.id !== "dashboard" && item.id !== "analysis") {
                  navigate("login");
                } else {
                  navigate(item.id);
                }
                setMobileOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 20px",
                textAlign: "left",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(0,255,65,.08)",
                color: page === item.id ? "#00ff41" : "rgba(0,255,65,.7)",
                fontSize: "13px",
                letterSpacing: ".12em",
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          borderTop: "1px solid rgba(0,255,65,.1)",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <div style={{ display: "flex" }} />
        <div
          style={{
            fontSize: ".58rem",
            color: "rgba(0,255,65,.35)",
            padding: "4px 0",
          }}
        >
          SESSION: <span style={{ color: "#00f5ff" }}>ADM-0x4F2A</span>
          <span style={{ margin: "0 8px", color: "rgba(0,255,65,.2)" }}>|</span>
          NODE: <span style={{ color: "#00ff41" }}>NEXUS-EAST-03</span>
        </div>
      </div>
    </nav>
  );
}
