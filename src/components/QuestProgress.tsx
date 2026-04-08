import { useEffect, useRef, useState } from 'react';
import finalGiftImage from '../assets/wheel/finalgift.png';

const TRACK_WIDTH = 528;
const STEP_WIDTH = 78.86;
const START_OFFSET = 16;

export function QuestProgress({ streak }: { streak: number }) {
  const activeDays = Math.max(1, Math.min(7, streak));
  const progressSteps = Math.min(activeDays, 6);
  const desktopProgressWidth = Math.min(TRACK_WIDTH, Math.round(START_OFFSET + progressSteps * STEP_WIDTH));
  const [trackWidth, setTrackWidth] = useState(TRACK_WIDTH);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = trackRef.current;

    if (!node) {
      return;
    }

    const updateTrackWidth = () => {
      setTrackWidth(Math.round(node.getBoundingClientRect().width) || TRACK_WIDTH);
    };

    updateTrackWidth();

    const resizeObserver = new ResizeObserver(updateTrackWidth);
    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const progressWidth = Math.min(trackWidth, Math.round((desktopProgressWidth / TRACK_WIDTH) * trackWidth));

  return (
    <div className="streak-progress">
      <p className="streak-progress__text">
        Крути колесо 7 дней подряд без пропусков и получи на 7-й день гарантированный 1 день подписки!
      </p>

      <div ref={trackRef} className="streak-progress__track" aria-label={`Прогресс серии: ${activeDays} из 7 дней`}>
        <div className="streak-progress__fill" style={{ width: `${progressWidth}px` }} />

        {Array.from({ length: 6 }, (_, index) => index + 1).map((day) => (
          <div key={day} className="streak-progress__day">
            {day}
          </div>
        ))}

        <div className="streak-progress__final">
          <span className="streak-progress__gift" aria-hidden="true">
            <img src={finalGiftImage} alt="" />
          </span>
          <span className="streak-progress__final-number">7</span>
        </div>
      </div>
    </div>
  );
}
