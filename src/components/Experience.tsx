"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

interface Props {
  sessionId: string;
  onComplete: () => void;
}

export default function Experience({ sessionId, onComplete }: Props) {
  const { timerDuration, messages } = content.experience;
  const [secondsLeft, setSecondsLeft] = useState(timerDuration);
  const [currentMessage, setCurrentMessage] = useState(messages[0].text);
  const [msgVisible, setMsgVisible] = useState(false);
  const startRef = useRef(Date.now());
  const completedRef = useRef(false);
  const lastMsgIndexRef = useRef(-1);

  // Fade in first message
  useEffect(() => {
    const t = setTimeout(() => setMsgVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Timer + message cycling
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      const remaining = Math.max(0, timerDuration - elapsed);
      setSecondsLeft(remaining);

      // Find the latest message that should be shown
      let newIndex = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (elapsed >= messages[i].delay) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== -1 && newIndex !== lastMsgIndexRef.current) {
        lastMsgIndexRef.current = newIndex;
        setMsgVisible(false);
        setTimeout(() => {
          setCurrentMessage(messages[newIndex].text);
          setMsgVisible(true);
        }, 700);
      }

      if (remaining === 0 && !completedRef.current) {
        completedRef.current = true;
        clearInterval(interval);
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "experience_completed" }),
        });
        onComplete();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [timerDuration, messages, onComplete]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="stage stage--visible experience">
      <div
        className="timer"
        aria-live="polite"
        aria-label={`${minutes} minutes ${seconds} seconds remaining`}
      >
        {minutes}:{seconds}
      </div>
      <div className={`experience-message ${msgVisible ? "experience-message--visible" : ""}`}>
        {currentMessage.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < currentMessage.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
