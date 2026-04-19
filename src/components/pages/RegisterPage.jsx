import { useState } from "react";
import { calcStrength } from "../shared/Utils";

export function RegisterPage({ navigate }) {
  const [form, setForm] = useState({
    user: "",
    email: "",
    pass: "",
    confirm: "",
    code: "",
    role: "analyst",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);

  const strengthColors = [
    "#ff003c",
    "#ff003c",
    "#ff8c00",
    "#ffe600",
    "#00ff41",
    "#00f5ff",
  ];
  const strengthLabels = ["", "WEAK", "WEAK", "FAIR", "STRONG", "MAXIMUM"];

  const validate1 = () => {
    const nextErrors = {};
    if (!form.user || form.user.length < 3) nextErrors.user = "Min 3 characters required";
    if (!form.email || !form.email.includes("@")) nextErrors.email = "Valid email required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validate2 = () => {
    const nextErrors = {};
    if (strength < 2) nextErrors.pass = "Password too weak";
    if (form.pass !== form.confirm) nextErrors.confirm = "Passwords do not match";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => navigate("login"), 1500);
    }, 1800);
  };

  const nextStep = () => {
    if (step === 1 && !validate1()) return;
    if (step === 2 && !validate2()) return;
    if (step === 3) {
      handleRegister();
      return;
    }
    setStep((value) => value + 1);
    setErrors({});
  };

  if (done) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 130px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div
            className="font-orb"
            style={{
              fontSize: "2.5rem",
              color: "#00ff41",
              textShadow: "0 0 30px #00ff41",
              marginBottom: 12,
              animation: "pulse-border 2s ease infinite",
            }}
          >
            OK
          </div>
          <div
            className="font-orb glitch"
            style={{
              fontSize: "1.8rem",
              color: "#00ff41",
              letterSpacing: ".15em",
              marginBottom: 8,
            }}
          >
            REGISTRATION APPROVED
          </div>
          <div
            style={{
              fontSize: ".65rem",
              color: "rgba(0,255,65,.6)",
              marginBottom: 20,
              letterSpacing: ".08em",
            }}
          >
            Your account has been created successfully.
            <br />
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 130px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ width: "100%", maxWidth: 500 }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            className="font-orb glitch"
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#00ff41",
              textShadow: "0 0 20px #00ff41, 0 0 40px rgba(0,255,65,.2)",
              letterSpacing: ".25em",
              marginBottom: 8,
            }}
          >
            NEXUS
            <span style={{ color: "#00f5ff" }}>//</span>
            SEC
          </div>
          <div
            style={{
              fontSize: ".65rem",
              letterSpacing: ".3em",
              color: "rgba(0,255,65,.5)",
            }}
          >
            OPERATOR REGISTRATION - STEP {step}/3
          </div>
          <div
            style={{
              marginTop: 12,
              height: 3,
              background: "rgba(0,255,65,.1)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#00ff41",
                width: `${(step / 3) * 100}%`,
                boxShadow: "0 0 10px #00ff41",
                transition: "width .4s ease",
              }}
            />
          </div>
        </div>

        <div className="panel-box fade-up-1" style={{ padding: 28, position: "relative", minHeight: 300 }}>
          {step === 1 && (
            <>
              <div
                className="font-orb"
                style={{
                  fontSize: ".62rem",
                  letterSpacing: ".25em",
                  color: "#00f5ff",
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: "1px solid rgba(0,255,65,.15)",
                }}
              >
                <span style={{ color: "#00ff41" }}>* </span>
                ACCOUNT CREDENTIALS
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  className="font-mono"
                  style={{
                    fontSize: ".62rem",
                    color: "rgba(0,255,65,.6)",
                    letterSpacing: ".15em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#00f5ff" }}>[01]</span>
                  USERNAME
                </label>
                <input
                  className="input-cyber font-mono"
                  type="text"
                  placeholder="Choose username..."
                  value={form.user}
                  onChange={(e) => setForm((current) => ({ ...current, user: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: ".75rem",
                    borderRadius: 2,
                  }}
                />
                {errors.user && (
                  <div style={{ fontSize: ".6rem", color: "#ff003c", marginTop: 4 }}>
                    {errors.user}
                  </div>
                )}
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{
                    fontSize: ".62rem",
                    color: "rgba(0,255,65,.6)",
                    letterSpacing: ".15em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#00f5ff" }}>[02]</span>
                  EMAIL ADDRESS
                </label>
                <input
                  className="input-cyber font-mono"
                  type="email"
                  placeholder="operator@nexus.sec..."
                  value={form.email}
                  onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: ".75rem",
                    borderRadius: 2,
                  }}
                />
                {errors.email && (
                  <div style={{ fontSize: ".6rem", color: "#ff003c", marginTop: 4 }}>
                    {errors.email}
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div
                className="font-orb"
                style={{
                  fontSize: ".62rem",
                  letterSpacing: ".25em",
                  color: "#00f5ff",
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: "1px solid rgba(0,255,65,.15)",
                }}
              >
                <span style={{ color: "#00ff41" }}>* </span>
                SECURITY CONFIGURATION
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  className="font-mono"
                  style={{
                    fontSize: ".62rem",
                    color: "rgba(0,255,65,.6)",
                    letterSpacing: ".15em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#00f5ff" }}>[01]</span>
                  ACCESS PASSWORD
                </label>
                <input
                  className="input-cyber font-mono"
                  type="password"
                  placeholder="Min 8 characters..."
                  value={form.pass}
                  onChange={(e) => {
                    const password = e.target.value;
                    setForm((current) => ({ ...current, pass: password }));
                    setStrength(calcStrength(password));
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: ".75rem",
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 10px",
                    background: "rgba(0,0,0,.4)",
                    border: "1px solid rgba(0,255,65,.15)",
                    borderRadius: 2,
                    fontSize: ".6rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "rgba(0,255,65,.5)" }}>STRENGTH:</span>
                    <span style={{ color: strengthColors[strength], fontWeight: 700 }}>
                      {strengthLabels[strength]}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "rgba(0,255,65,.08)",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: strengthColors[strength],
                        width: `${(strength / 5) * 100}%`,
                        transition: "all .3s",
                      }}
                    />
                  </div>
                </div>
                {errors.pass && (
                  <div style={{ fontSize: ".6rem", color: "#ff003c", marginTop: 4 }}>
                    {errors.pass}
                  </div>
                )}
              </div>

              <div>
                <label
                  className="font-mono"
                  style={{
                    fontSize: ".62rem",
                    color: "rgba(0,255,65,.6)",
                    letterSpacing: ".15em",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#00f5ff" }}>[02]</span>
                  CONFIRM PASSWORD
                </label>
                <input
                  className="input-cyber font-mono"
                  type="password"
                  placeholder="Re-enter password..."
                  value={form.confirm}
                  onChange={(e) => setForm((current) => ({ ...current, confirm: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: ".75rem",
                    borderRadius: 2,
                  }}
                />
                {errors.confirm && (
                  <div style={{ fontSize: ".6rem", color: "#ff003c", marginTop: 4 }}>
                    {errors.confirm}
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div
                className="font-orb"
                style={{
                  fontSize: ".62rem",
                  letterSpacing: ".25em",
                  color: "#00f5ff",
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: "1px solid rgba(0,255,65,.15)",
                }}
              >
                <span style={{ color: "#00ff41" }}>* </span>
                ROLE ASSIGNMENT
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  className="font-mono"
                  style={{
                    fontSize: ".62rem",
                    color: "rgba(0,255,65,.6)",
                    letterSpacing: ".15em",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ color: "#00f5ff" }}>*</span>
                  Select your role
                </label>

                {["admin"].map((role) => (
                  <label
                    key={role}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 12px",
                      marginBottom: 8,
                      border:
                        form.role === role
                          ? "1px solid rgba(0,255,65,.6)"
                          : "1px solid rgba(0,255,65,.15)",
                      background:
                        form.role === role ? "rgba(0,255,65,.08)" : "transparent",
                      borderRadius: 2,
                      cursor: "crosshair",
                      transition: "all .2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={form.role === role}
                      onChange={(e) => setForm((current) => ({ ...current, role: e.target.value }))}
                      style={{ cursor: "crosshair", marginRight: 10 }}
                    />
                    <span
                      className="font-mono"
                      style={{
                        fontSize: ".65rem",
                        color: form.role === role ? "#00ff41" : "rgba(0,255,65,.5)",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                      }}
                    >
                      {role}
                    </span>
                  </label>
                ))}
              </div>

              {loading && (
                <div
                  style={{
                    height: 4,
                    background: "rgba(0,255,65,.1)",
                    borderRadius: 2,
                    overflow: "hidden",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "#00ff41",
                      animation: "progress-fill 1.5s ease forwards",
                    }}
                  />
                </div>
              )}
            </>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {step > 1 && (
              <button
                onClick={() => {
                  setStep((value) => value - 1);
                  setErrors({});
                }}
                disabled={loading}
                className="btn-cyber font-orb"
                style={{
                  flex: 1,
                  padding: "10px",
                  fontSize: ".65rem",
                  letterSpacing: ".15em",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                PREVIOUS
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={loading}
              className="btn-cyber font-orb"
              style={{
                flex: 1,
                padding: "10px",
                fontSize: ".65rem",
                letterSpacing: ".15em",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {step === 3 ? (loading ? "REGISTERING..." : "COMPLETE") : "NEXT"}
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button
              onClick={() => navigate("login")}
              style={{
                background: "none",
                border: "none",
                color: "rgba(0,255,65,.5)",
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: ".6rem",
                letterSpacing: ".08em",
                cursor: "crosshair",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00f5ff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(0,255,65,.5)")}
            >
              BACK TO LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
