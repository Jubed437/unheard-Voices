"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

interface Props {
  sessionId: string;
  onSuccess: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm({ sessionId, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const c = content.emailForm;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "email_form_viewed" }),
    });
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!EMAIL_RE.test(email)) {
      setError(content.errors.invalidEmail);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, optedInFuture: optIn, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        const map: Record<string, string> = {
          invalid_email: content.errors.invalidEmail,
          already_submitted: content.errors.alreadySubmitted,
          session_not_ready: content.errors.sessionNotReady,
          session_expired: content.errors.sessionExpired,
          rate_limited: content.errors.rateLimited,
        };
        setError(map[data.error] ?? content.errors.generic);
        return;
      }

      onSuccess();
    } catch {
      setError(content.errors.generic);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`stage ${visible ? "stage--visible" : ""} email-stage`}>
      <form className="email-form" onSubmit={handleSubmit} noValidate>
        <label className="form-heading" htmlFor="email-input">
          {c.heading}
        </label>
        <input
          id="email-input"
          type="email"
          className="email-input"
          placeholder={c.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-describedby={error ? "email-error" : undefined}
          aria-invalid={!!error}
        />
        {error && (
          <p id="email-error" className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="opt-in-label">
          <input
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
            className="opt-in-checkbox"
          />
          <span>{c.optInLabel}</span>
        </label>
        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? "Sending\u2026" : c.button}
        </button>
        <p className="form-disclaimer">{c.disclaimer}</p>
      </form>
    </div>
  );
}
