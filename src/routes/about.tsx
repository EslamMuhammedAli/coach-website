import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { whatsappHref } from "@/lib/offer";

export const Route = createFileRoute("/about")({ component: AboutPage });

const SLIDES = [
  { src: "/about/1.png", titleKey: "about_slide_1_title", descKey: "about_slide_1_desc" },
  { src: "/about/4.png", titleKey: "about_slide_4_title", descKey: "about_slide_4_desc" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function AboutPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  return (
    <main className="min-h-dvh bg-bg text-fg" dir={isArabic ? "rtl" : "ltr"}>
      {/* ============ القسم 1: cover + الاسم + النبذة ============ */}
      <div className="mx-auto grid min-h-dvh max-w-6xl gap-6 px-4 py-4 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-6">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
            <img
              src="/about/cover.png"
              alt={t("about_me")}
              className="aspect-[3/4] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-center">
              <h2 className="text-2xl font-extrabold text-white drop-shadow-lg md:text-3xl">
                {t("about_name")}
              </h2>
            </div>
          </div>
        </motion.section>

        <motion.aside
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          className="flex flex-col justify-center gap-6 pb-8 lg:pb-4"
        >
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>

          <Link
            to="/"
            className="flex w-fit items-center gap-2 text-sm text-muted transition hover:text-fg"
          >
            <ArrowRight className="size-4 rotate-180" />
            {t("back_to_home")}
          </Link>

          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-muted">
              {t("about_kicker")}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              {t("about_me")}
            </h1>
          </div>

          <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="whitespace-pre-line text-base leading-relaxed text-muted">
              {t("about_bio")}
            </p>
          </div>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-fg shadow-lg transition hover:opacity-90 lg:text-lg"
          >
            <MessageCircle className="size-5 lg:size-6" />
            {t("book_via_whatsapp")}
          </a>
        </motion.aside>
      </div>

      {/* ============ القسم 2: التخصصات والمهارات ============ */}
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-24">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
            <img
              src="/about/2.png"
              alt={t("about_skills_title")}
              className="aspect-[3/4] w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </motion.section>

        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInRight}
          className="flex flex-col justify-center gap-5"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-muted">
              {t("about_skills_kicker")}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight lg:text-3xl">
              {t("about_skills_title")}
            </h2>
          </div>

          <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:p-8">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted lg:text-base">
              {t("about_slides_title")}
            </p>
          </div>
        </motion.aside>
      </div>

      {/* ============ القسم 3: رحلتي في كمال الأجسام ============ */}
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(18rem,5fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-24">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
            <img
              src="/about/3.png"
              alt={t("about_journey_title")}
              className="aspect-[3/4] w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </motion.section>

        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInRight}
          className="flex flex-col justify-center gap-5"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-muted">
              {t("about_slides_kicker")}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight lg:text-3xl">
              {t("about_journey_title")}
            </h2>
          </div>

          <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)] lg:p-8">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted lg:text-base">
              {t("about_journey_content")}
            </p>
          </div>
        </motion.aside>
      </div>

      {/* ============ القسم 4: الشرائح (المحطات) ============ */}
      <section className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <div className="space-y-16 lg:space-y-24">
          {SLIDES.map((slide, i) => {
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className={`flex flex-col gap-6 lg:items-center lg:gap-10 ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <motion.div
                  variants={isReversed ? slideInRight : slideInLeft}
                  className="w-full lg:w-1/2"
                >
                  <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
                    <img
                      src={slide.src}
                      alt={t(slide.titleKey)}
                      className="aspect-[9/16] w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={isReversed ? slideInLeft : slideInRight}
                  className="w-full space-y-3 lg:w-1/2"
                >
                  <p className="text-xs font-medium tracking-[0.22em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-extrabold leading-tight lg:text-3xl">
                    {t(slide.titleKey)}
                  </h3>
                  <p className="whitespace-pre-line text-base leading-relaxed text-muted">
                    {t(slide.descKey)}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}