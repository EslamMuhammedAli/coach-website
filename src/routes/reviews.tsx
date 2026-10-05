import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/reviews")({ component: ReviewsPage });

const SCREENSHOTS = [
  "/reviews/1.png",
  "/reviews/2.png",
  "/reviews/3.png",
  "/reviews/4.png",
];

function ReviewsPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <header className="mb-8 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted transition hover:text-fg">
            <ArrowRight className="size-4 rotate-180" />
            {t("back_to_home")}
          </Link>
          <h1 className="text-xl font-bold md:text-2xl">{t("customer_reviews")}</h1>
          <LanguageSwitcher />
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {SCREENSHOTS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${t("customer_reviews")} ${i + 1}`}
              className="w-full rounded-xl shadow-[var(--shadow-border)]"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </main>
  );
}