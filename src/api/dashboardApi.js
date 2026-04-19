import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

// Generic handler (optional but clean)
const handle = (promise) =>
  promise.then((res) => res.data).catch((err) => {
    console.error("API Error:", err);
    throw err;
  });

export const getStats = () => handle(api.get("/stats"));
export const getResources = () => handle(api.get("/resources"));
export const getTraffic = () => handle(api.get("/traffic"));
export const getThreats = () => handle(api.get("/threats"));
export const getLogs = () => handle(api.get("/logs"));
export const getAttackSummary = () => handle(api.get("/attacks/summary"));
