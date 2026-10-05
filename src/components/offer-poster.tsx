import { Dumbbell, MessageCircle, Salad, ListChecks } from "lucide-react";
import { OFFER, whatsappHref } from "@/lib/offer";
import { cn } from "@/lib/utils";

const serviceIcons = [Dumbbell, Salad, MessageCircle, ListChecks];

const POSTER_TEXT = {
  discountLabel: "خصم",
  kicker: "عرض لفترة محدودة",
  title: "التدريب الأونلاين",
  subtitle: "جسم متناسق · أقصى استفادة",
  insteadOf: "بدل",
  cta: "احجز الآن",
  services: [
    "تدريب عن بعد",
    "تغذية محكمة",
    "متابعة واتساب يومياً",
    "برنامج تدريبي مبسّط",
  ],
  planNames: {
    quarter: "3 أشهر",
    month: "الشهر",
  } as Record<string, string>,
};

type PosterFormat = "story" | "feed";

export function OfferPoster({ format = "story" }: { format?: PosterFormat }) {
  const story = format === "story";

  return (
    <article className={cn("artboard", story ? "artboard-story" : "artboard-feed")} dir="rtl" lang="ar">
      <img
        className="artboard-photo"
        src="/offer/cinematic.jpg"
        alt="مدرب أونلاين في الجيم بإضاءة سينمائية"
        crossOrigin="anonymous"
      />
      <div className="artboard-shade" />
      <div className="artboard-grain" aria-hidden="true" />

      <div
        className={cn(
          "absolute z-[2] flex flex-col items-center justify-center rounded-full bg-accent text-accent-fg",
          story ? "left-[56px] top-[72px] size-[196px]" : "left-[48px] top-[48px] size-[168px]",
        )}
      >
        <span className={cn("font-semibold", story ? "text-[22px]" : "text-[18px]")}>
          {POSTER_TEXT.discountLabel}
        </span>
        <span className={cn("font-extrabold leading-none tracking-tight", story ? "text-[64px]" : "text-[54px]")}>
          {OFFER.discountValue}
        </span>
      </div>

      <div className="artboard-content">
        {story ? (
          <header className="flex flex-col items-center text-center">
            <p className="text-[22px] font-medium tracking-[0.28em] text-muted">{POSTER_TEXT.kicker}</p>
            <div className="mt-4 h-px w-16 bg-fg/30" />
            <h1 className="mt-4 text-[48px] font-extrabold leading-none">{POSTER_TEXT.title}</h1>
          </header>
        ) : (
          <div />
        )}

        <footer className={cn("flex flex-col", story ? "gap-5" : "gap-3.5")}>
          {!story ? (
            <header className="text-center">
              <p className="text-[16px] font-medium tracking-[0.22em] text-muted">{POSTER_TEXT.kicker}</p>
              <h1 className="mt-2 text-[36px] font-extrabold leading-none">{POSTER_TEXT.title}</h1>
            </header>
          ) : null}

          <p className={cn("text-center font-medium text-muted", story ? "text-[24px]" : "text-[18px]")}>
            {POSTER_TEXT.subtitle}
          </p>

          <div className={cn("grid grid-cols-2", story ? "gap-4" : "gap-3")}>
            {OFFER.plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  plan.featured
                    ? "bg-accent text-accent-fg"
                    : "bg-bg/55 shadow-[var(--shadow-border)] backdrop-blur-[2px]",
                  story ? "rounded-[28px] px-6 py-5" : "rounded-[22px] px-5 py-4",
                )}
              >
                <p
                  className={cn(
                    "font-medium",
                    story ? "text-[20px]" : "text-[17px]",
                    plan.featured ? "text-accent-fg/70" : "text-muted",
                  )}
                >
                  {POSTER_TEXT.planNames[plan.id] ?? plan.id}
                </p>
                <p
                  className={cn(
                    "font-extrabold leading-none tracking-tight",
                    story ? "mt-1 text-[56px]" : "mt-1 text-[44px]",
                  )}
                >
                  {plan.price}
                </p>
                <p
                  className={cn(
                    story ? "mt-2 text-[20px]" : "mt-1 text-[17px]",
                    plan.featured ? "text-accent-fg/60" : "text-subtle",
                  )}
                >
                  {POSTER_TEXT.insteadOf} <span className="line-through decoration-2">{plan.was}</span>
                </p>
              </div>
            ))}
          </div>

          <ul className={cn("grid grid-cols-2", story ? "gap-x-5 gap-y-2.5" : "gap-x-4 gap-y-2")}>
            {POSTER_TEXT.services.map((label, i) => {
              const Icon = serviceIcons[i] ?? Dumbbell;
              return (
                <li
                  key={label}
                  className={cn("flex items-center gap-3 font-medium text-fg", story ? "text-[20px]" : "text-[17px]")}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full bg-fg/10",
                      story ? "size-9" : "size-8",
                    )}
                  >
                    <Icon className={story ? "size-5" : "size-4"} strokeWidth={1.75} />
                  </span>
                  {label}
                </li>
              );
            })}
          </ul>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-full bg-accent font-bold text-accent-fg",
              story ? "h-[76px] text-[28px]" : "h-[62px] text-[24px]",
            )}
          >
            {POSTER_TEXT.cta}
          </a>
        </footer>
      </div>
    </article>
  );
}