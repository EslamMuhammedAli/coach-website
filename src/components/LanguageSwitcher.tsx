import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith("ar") ? "en" : "ar";
    i18n.changeLanguage(newLang);
    if (typeof document !== "undefined") {
      document.cookie = `app-language=${newLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-fg transition hover:bg-elevated"
      type="button"
    >
      {t("language")}
    </button>
  );
}