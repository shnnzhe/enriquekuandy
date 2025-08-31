import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const slides = useMemo(
    () => [
      "嗨 Enrique",
      "祝你生日快乐",
      "祝你事业成功",
      "祝你一路顺风",
      "祝你一切顺利",
      "我依然爱你",
    ],
    []
  );

  const TYPE_SPEED = 120;      
  const HOLD_MS = 2000;       
  const ERASE_BETWEEN = false; 
  const ERASE_SPEED = 80;     

  const [slideIndex, setSlideIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const timerRef = useRef(null);
  const currentText = slides[slideIndex];

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const run = () => {
      if (!isDeleting) {
        const next = currentText.slice(0, typed.length + 1);
        setTyped(next);

        if (next === currentText) {
          if (ERASE_BETWEEN) {
            timerRef.current = setTimeout(() => setIsDeleting(true), HOLD_MS);
          } else {
            timerRef.current = setTimeout(() => {
              setTyped("");
              setSlideIndex((i) => (i + 1) % slides.length);
            }, HOLD_MS);
          }
        } else {
          timerRef.current = setTimeout(run, TYPE_SPEED);
        }
      } else {
        const next = currentText.slice(0, Math.max(0, typed.length - 1));
        setTyped(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setSlideIndex((i) => (i + 1) % slides.length);
          timerRef.current = setTimeout(run, TYPE_SPEED);
        } else {
          timerRef.current = setTimeout(run, ERASE_SPEED);
        }
      }
    };

    timerRef.current = setTimeout(run, TYPE_SPEED);
    return clear;
  }, [typed, isDeleting, currentText, slides.length]);

  useEffect(() => {
    document.title = currentText;
  }, [currentText]);

  return (
    <div className="wrap">
      <div className="card">
        <h1 className="typing" aria-label={currentText}>
          {typed}
          <span className="cursor" aria-hidden="true" />
        </h1>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
        30 Agustus 2025 made by Eva
      </footer>
    </div>
  );
}
