"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

export default function Confirmation() {
  const [visible, setVisible] = useState(false);
  const c = content.confirmation;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`stage ${visible ? "stage--visible" : ""} confirmation`}>
      <div className="confirmation-inner">
        {c.lines.map((line, i) => (
          <p key={i} className="confirmation-line" style={{ animationDelay: `${0.2 + i * 0.5}s` }}>
            {line}
          </p>
        ))}
        <p className="confirmation-welcome" style={{ animationDelay: `${0.2 + c.lines.length * 0.5 + 0.4}s` }}>
          {c.welcome}
        </p>
        <div className="closing" style={{ animationDelay: `${0.2 + c.lines.length * 0.5 + 1.2}s` }}>
          {c.closing.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <a href="/" className="reenter-link" style={{ animationDelay: `${0.2 + c.lines.length * 0.5 + 2.8}s` }}>
          {c.reenterLabel}
        </a>
      </div>
    </div>
  );
}
