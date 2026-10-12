"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

interface Props {
  onDone: () => void;
}

export default function Completion({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    let elapsed = 0;
    const steps = content.completion;

    const advance = (index: number) => {
      if (index >= steps.length) {
        setTimeout(onDone, 800);
        return;
      }
      setVisible(false);
      setTimeout(() => {
        setStep(index);
        setVisible(true);
        elapsed += steps[index].pause;
        setTimeout(() => advance(index + 1), steps[index].pause);
      }, 600);
    };

    const t = setTimeout(() => advance(0), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="stage stage--visible completion">
      <p className={`completion-text ${visible ? "completion-text--visible" : ""}`}>
        {content.completion[step]?.text}
      </p>
    </div>
  );
}
