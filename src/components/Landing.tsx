"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`stage ${visible ? "stage--visible" : ""}`}>
      <div className="landing-inner">
        <h1 className="title">{content.landing.title}</h1>
        <p className="subtitle">{content.landing.subtitle}</p>
        <div className="invitation">
          {content.landing.invitation.map((line, i) => (
            <p key={i} style={{ animationDelay: `${0.6 + i * 0.4}s` }}>
              {line.split("\n").map((part, j) => (
                <span key={j}>
                  {part}
                  {j < line.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
        <button
          className="cta-button"
          onClick={onStart}
          style={{ animationDelay: "1.8s" }}
        >
          {content.landing.button}
        </button>
      </div>
    </div>
  );
}
