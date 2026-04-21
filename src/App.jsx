import { useEffect, useRef, useState } from "react";

import GlobalStyles from "./components/shared/GlobalStyles";
import { MatrixRain } from "./components/shared/MatrixRain";
import { Scanlines } from "./components/shared/Scanlines";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { ThreatsPage } from "./components/pages/ThreatsPage";
import { NetworkPage } from "./components/pages/NetworkPage";
import { PacketsPage } from "./components/pages/PacketsPage";
import { HistoryPage } from "./components/pages/HistoryPage";
import { LogsPage } from "./components/pages/LogsPage";
import { AnalysisPage } from "./components/pages/AnalysisPage";

const BOOT_LINES = [
  "Initializing kernel modules...",
  "Loading threat intelligence DB v4.2.1",
  "Connecting to 44 global threat feeds",
  "Starting intrusion detection engine",
  "Mounting encrypted vaults [AES-256-GCM]",
  "Calibrating neural anomaly detector",
  "Establishing secure VPN tunnels [OK]",
  "Syncing firewall ruleset #1247 [58291 rules]",
  "Loading geographic threat map [216 nations]",
  "Starting deep packet inspection engine",
  "Initializing SIEM correlation engine",
  "Connecting to NEXUS command relay",
  "Verifying 64 endpoint nodes - all nominal",
  "ALL SYSTEMS OPERATIONAL - LAUNCHING OPS CENTER",
];

const PAGE_PATHS = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  threats: "/threats",
  network: "/network",
  packets: "/packets",
  history: "/history",
  logs: "/logs",
  analysis: "/analysis",
};

const PATH_PAGES = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
);

const PROTECTED_PAGES = new Set([
  "dashboard",
  "threats",
  "network",
  "packets",
  "history",
  "logs",
]);

function getPageFromLocation() {
  return PATH_PAGES[window.location.pathname] || "login";
}

function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const next = () => {
      if (idx.current >= BOOT_LINES.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 600);
        }, 350);
        return;
      }

      setLines((current) => [...current, BOOT_LINES[idx.current]]);
      setPct(Math.round(((idx.current + 1) / BOOT_LINES.length) * 100));
      idx.current += 1;
      setTimeout(next, 90 + Math.random() * 120);
    };

    const timeoutId = setTimeout(next, 350);
    return () => clearTimeout(timeoutId);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "#000",
        zIndex: 9999,
        overflow: "hidden",
        opacity: done ? 0 : 1,
        transition: "opacity .4s ease",
      }}
    >
      <div
        className="font-orb font-black tracking-widest glitch"
        style={{
          fontSize: "clamp(2rem,5vw,3.4rem)",
          color: "#00ff41",
          textShadow: "0 0 30px #00ff41,0 0 60px #00ff41",
        }}
      >
        NEXUS
        <span style={{ color: "#00f5ff" }}>//</span>
        SEC
      </div>

      <div className="text-xs tracking-[.25em]" style={{ color: "rgba(0,255,65,.5)" }}>
        CYBER OPERATIONS CENTER v4.2.1
      </div>

      <div
        className="w-[min(560px,90vw)] h-44 overflow-hidden text-xs"
        style={{ color: "#00cc33" }}
      >
        {lines.map((line, i) => (
          <div key={i} className="py-[2px]">
            <span style={{ color: "#00f5ff" }}>&gt; </span>
            {line}
          </div>
        ))}
      </div>

      <div
        className="w-[min(560px,90vw)] h-[7px] rounded-sm overflow-hidden border"
        style={{ background: "rgba(0,255,65,.08)", borderColor: "#00cc33" }}
      >
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${pct}%`,
            background: "#00ff41",
            boxShadow: "0 0 10px #00ff41",
          }}
        />
      </div>

      <div className="text-xs" style={{ color: "#00f5ff" }}>
        {pct}%
      </div>
    </div>
  );
}

function PlaceholderPage({ title, copy }) {
  return (
    <div style={{ padding: 20 }}>
      <div
        className="font-orb"
        style={{
          color: "#00ff41",
          letterSpacing: ".18em",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ color: "rgba(0,255,65,.65)" }}>{copy}</div>
    </div>
  );
}

function App() {
  const [booting, setBooting] = useState(true);
  const [page, setPage] = useState(() => getPageFromLocation());
  const [authed, setAuthed] = useState(
    () => localStorage.getItem("nexus-auth") === "true"
  );
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const syncRoute = () => setPage(getPageFromLocation());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigate = (nextPage, { replace = false } = {}) => {
    const path = PAGE_PATHS[nextPage] || PAGE_PATHS.login;
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({}, "", path);
    setPage(nextPage);
  };

  useEffect(() => {
    if (!authed && PROTECTED_PAGES.has(page)) {
      navigate("login", { replace: true });
    }
  }, [authed, page]);

  const renderPage = () => {
    switch (page) {
      case "register":
        return <RegisterPage navigate={navigate} />;
      case "dashboard":
        return <DashboardPage setStats={setStats} />;
      case "threats":
        return <ThreatsPage />;
      case "network":
        return <NetworkPage />;
      case "packets":
        return <PacketsPage />;
      case "history":
        return <HistoryPage />;
      case "logs":
        return <LogsPage />;
      case "analysis":
        return <AnalysisPage />;
      case "login":
      default:
        return <LoginPage navigate={navigate} setAuthed={setAuthed} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <MatrixRain opacity={0.06} />
      <Scanlines />

      {booting && <BootScreen onDone={() => setBooting(false)} />}

      {!booting && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background:
              "radial-gradient(circle at top, rgba(0,255,65,.04), transparent 30%), linear-gradient(180deg, rgba(0,20,5,.95), rgba(0,5,0,1))",
          }}
        >
          <Navbar
            page={page}
            navigate={navigate}
            authed={authed}
            setAuthed={setAuthed}
            stats={stats}
          />

          <main style={{ flex: 1, position: "relative", zIndex: 10 }}>
            {renderPage()}
            {/* <DashboardPage setStats={setStats} /> */}
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
