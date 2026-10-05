import { useEffect, useRef, useState } from "react";
import { OfferPoster } from "@/components/offer-poster";

const ART = { width: 1080, height: 1920 };

export function ScaledPoster() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => {
      const next = Math.min(frame.clientWidth / ART.width, frame.clientHeight / ART.height);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.3);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="flex h-full min-h-0 w-full items-center justify-center">
      <div
        className="relative overflow-hidden rounded-xl shadow-[var(--shadow-border)]"
        style={{ width: ART.width * scale, height: ART.height * scale }}
      >
        <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
          <OfferPoster format="story" />
        </div>
      </div>
    </div>
  );
}
