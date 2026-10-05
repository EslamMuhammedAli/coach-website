import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/transformations")({ component: TransformationsPage });

const TRANSFORMATIONS = [
  { before: "/transformations/1-before.png", after: "/transformations/1-after.png", name: "أحمد" },
  { before: "/transformations/2-before.png", after: "/transformations/2-after.png", name: "محمد" },
  { before: "/transformations/3-before.png", after: "/transformations/3-after.png", name: "خالد" },
  { before: "/transformations/4-before.png", after: "/transformations/4-after.png", name: "يوسف" },
];

function TransformationsPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <header className="mb-8 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted transition hover:text-fg">
            <ArrowRight className="size-4 rotate-180" />
            {t("back_to_home")}
          </Link>
          <h1 className="text-xl font-bold md:text-2xl">{t("transformations")}</h1>
          <LanguageSwitcher />
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {TRANSFORMATIONS.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={item.before} alt={`Before ${item.name}`} className="aspect-square w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-2 left-2 rounded-md bg-bg/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    {t("before")}
                  </span>
                </div>
                <div className="relative">
                  <img src={item.after} alt={`After ${item.name}`} className="aspect-square w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-2 right-2 rounded-md bg-accent/80 px-2 py-1 text-xs font-medium text-accent-fg backdrop-blur-sm">
                    {t("after")}
                  </span>
                </div>
              </div>
              <p className="p-3 text-center text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}