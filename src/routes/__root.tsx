import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import "../lib/i18n/config";
import appCss from "../styles.css?url";

const APP_NAME = "التدريب الأونلاين";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "عرض لفترة محدودة: تدريب أونلاين بخصم 50٪ — خطط تغذية ومتابعة يومية.",
      },
      { name: "theme-color", content: "#070708" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const isArabic = currentLang === "ar";

  useEffect(() => {
    // اقرأ اللغة من cookie بعد mount
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|;\s*)app-language=(ar|en)/);
      const stored = match?.[1] as "ar" | "en" | undefined;
      if (stored && stored !== i18n.language) {
        i18n.changeLanguage(stored);
      }
    }

    const updateDir = (lang: string) => {
      const isAr = lang.startsWith("ar");
      document.documentElement.lang = isAr ? "ar" : "en";
      document.documentElement.dir = isAr ? "rtl" : "ltr";
    };

    updateDir(i18n.language || "ar");
    i18n.on("languageChanged", updateDir);

    return () => {
      i18n.off("languageChanged", updateDir);
    };
  }, [i18n]);

  return (
    <html
      lang={currentLang}
      dir={isArabic ? "rtl" : "ltr"}
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}