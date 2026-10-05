import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, TrendingUp, User, Dumbbell, ListChecks, MessageCircle, Salad } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Countdown } from "@/components/countdown";
import { ScaledPoster } from "@/components/scaled-poster";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { OFFER, whatsappHref } from "@/lib/offer";

export const Route = createFileRoute("/")({ component: Home });

const detailIcons = {
  remote: Dumbbell,
  nutrition: Salad,
  whatsapp: MessageCircle,
  program: ListChecks,
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto grid min-h-dvh max-w-6xl gap-6 px-4 py-4 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-6">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          className="h-[calc(100dvh-6.5rem)] lg:h-auto lg:min-h-0"
        >
          <ScaledPoster />
        </motion.section>

        <motion.aside
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col justify-center gap-7 pb-44 lg:pb-4"
        >
          <motion.div variants={fadeInUp} className="flex justify-end">
            <LanguageSwitcher />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium tracking-[0.22em] text-muted">{t("offer_kicker")}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              {t("offer_title")}
            </h1>
            <p className="mt-2 text-base text-muted">{t("offer_subtitle")}</p>
          </motion.div>

          <motion.div variants={fadeInScale}>
            <p className="mb-3 text-sm font-medium text-muted">{t("offer_ends_in")}</p>
            <Countdown />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {OFFER.plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={fadeInUp}
                className={
                  plan.featured
                    ? "rounded-xl bg-accent p-4 text-accent-fg"
                    : "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                }
              >
                <p className={`text-sm font-medium ${plan.featured ? "text-accent-fg/70" : "text-muted"}`}>
                  {t(`plan_${plan.id}`)}
                </p>
                <p className="mt-1 flex items-baseline gap-1 text-3xl font-extrabold leading-none tracking-tight">
                  <span>{plan.price}</span>
                  <span className={`text-base font-bold ${plan.featured ? "text-accent-fg/80" : "text-muted"}`}>
                    {t("currency_egp")}
                  </span>
                </p>
                <p className={`mt-2 text-sm ${plan.featured ? "text-accent-fg/60" : "text-subtle"}`}>
                  {t("instead_of")} <span className="line-through">{plan.was}</span>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.ul variants={containerVariants} className="grid gap-3">
            {OFFER.services.map((service) => {
              const Icon = detailIcons[service.id];
              return (
                <motion.li
                  key={service.id}
                  variants={fadeInUp}
                  className="flex gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-elevated">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t(`service_${service.id}_title`)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {t(`service_${service.id}_detail`)}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* ===== أزرار الديسكتوب ===== */}
          <motion.div variants={containerVariants} className="hidden flex-col gap-3 lg:flex">
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="w-full">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppMark className="size-4" />
                  {t("book_via_whatsapp")}
                </a>
              </Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-center text-sm text-muted" dir="ltr">
              {OFFER.whatsappDisplay}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
              <Button asChild variant="outline">
                <Link to="/reviews">
                  <Star />
                  {t("customer_reviews")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/transformations">
                  <TrendingUp />
                  {t("transformations")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/about">
                  <User />
                  {t("about_me")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* ===== أزرار الموبايل ⭐ جديد ===== */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 lg:hidden">
            <Button asChild variant="outline" className="h-auto flex-col py-3">
              <Link to="/reviews" className="flex flex-col items-center gap-1">
                <Star className="size-4" />
                <span className="text-xs">{t("customer_reviews")}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col py-3">
              <Link to="/transformations" className="flex flex-col items-center gap-1">
                <TrendingUp className="size-4" />
                <span className="text-xs">{t("transformations")}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col py-3">
              <Link to="/about" className="flex flex-col items-center gap-1">
                <User className="size-4" />
                <span className="text-xs">{t("about_me")}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/95 p-3 backdrop-blur-sm lg:hidden"
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Button asChild className="min-h-11 flex-1">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              <WhatsAppMark className="size-4" />
              {t("book_via_whatsapp")}
            </a>
          </Button>
          <Button asChild variant="outline" className="min-h-11 px-3">
            <Link to="/reviews" aria-label={t("customer_reviews")}>
              <Star />
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}