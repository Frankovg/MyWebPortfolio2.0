'use client'

import { useState, useEffect, useMemo } from "react";

const PERIOD = 2000;

type TextAnimationProps = {
  texts: string[],
  period?: number,
}

const TextAnimation = ({ texts, period = PERIOD }: TextAnimationProps) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const fullText = useMemo(() => texts[loopNum % texts.length], [loopNum, texts]);

  useEffect(() => {
    const handleTick = () => {
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta((prevDelta) => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(100);
      }
    };

    const ticker = setInterval(() => {
      handleTick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, delta, fullText, loopNum, period]);

  return (
    <h1>
      <span className="border-r-[0.08em] border-solid border-[#6666]">
        {text}
      </span>
    </h1>
  );
};

export default TextAnimation;