import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OFFER } from "@/lib/offer";

type Parts = { days: string; hours: string; minutes: string; seconds: string };

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function split(ms: number): Parts {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

export function Countdown() {
  const { t } = useTranslation();
  const end = new Date(OFFER.endsAt).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(split(end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [end]);

  if (!parts) {
    const labels = [t("days"), t("hours"), t("minutes"), t("seconds")];
    return (
      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {labels.map((label) => (
          <div key={label} className="rounded-lg bg-elevated px-2 py-3 text-center shadow-[var(--shadow-border)]">
            <p className="text-xl font-semibold leading-none tracking-tight tabular-nums">--</p>
            <p className="mt-2 text-xs font-medium text-muted">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (end - Date.now() <= 0) {
    return <p className="text-sm font-medium text-muted">{t("offer_expired")}</p>;
  }

  const cells = [
    { label: t("days"), value: parts.days },
    { label: t("hours"), value: parts.hours },
    { label: t("minutes"), value: parts.minutes },
    { label: t("seconds"), value: parts.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2" aria-label={t("countdown_aria")}>
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-lg bg-elevated px-2 py-3 text-center shadow-[var(--shadow-border)]"
        >
          <p className="text-xl font-semibold leading-none tracking-tight tabular-nums">{cell.value}</p>
          <p className="mt-2 text-xs font-medium text-muted">{cell.label}</p>
        </div>
      ))}
    </div>
  );
}