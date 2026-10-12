"use client";

import { useEffect, useState } from "react";
import Landing from "@/components/Landing";
import Experience from "@/components/Experience";
import Completion from "@/components/Completion";
import EmailForm from "@/components/EmailForm";
import Confirmation from "@/components/Confirmation";

type Stage = "landing" | "experience" | "completion" | "email" | "confirmation";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "landing_visited" }),
    });
  }, []);

  async function handleStart(dev = false) {
    const res = await fetch("/api/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dev }),
    });
    const data = await res.json();
    if (data.sessionId) {
      setSessionId(data.sessionId);
      setStage(dev ? "email" : "experience");
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "experience_started" }),
      });
    }
  }

  return (
    <main className="root">
      {stage === "landing" && <Landing onStart={() => handleStart(false)} />}
      {process.env.NODE_ENV === "development" && stage === "landing" && (
        <button
          onClick={() => handleStart(true)}
          style={{
            position: "fixed", bottom: "1rem", right: "1rem",
            background: "#333", color: "#888", border: "1px solid #444",
            padding: "0.4rem 0.8rem", fontSize: "0.7rem", cursor: "pointer",
            fontFamily: "monospace", letterSpacing: "0.05em",
          }}
        >
          [dev] skip to form
        </button>
      )}
      {stage === "experience" && sessionId && (
        <Experience sessionId={sessionId} onComplete={() => setStage("completion")} />
      )}
      {stage === "completion" && (
        <Completion onDone={() => setStage("email")} />
      )}
      {stage === "email" && sessionId && (
        <EmailForm sessionId={sessionId} onSuccess={() => setStage("confirmation")} />
      )}
      {stage === "confirmation" && <Confirmation />}
    </main>
  );
}
