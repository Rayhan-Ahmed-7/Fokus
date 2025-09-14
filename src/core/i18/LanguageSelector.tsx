import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BengaliFlag,
  EnglishFlag,
  GermanFlag,
  SaudiArabFlag,
} from "@/assets/flags";
import { changeDirection, changeLanguage } from "../store/slices/themeSlice";
import { useAppSelector } from "../store/hooks";
import { useEffect } from "react";

const languages = [
  { code: "en", label: "English", flag: <EnglishFlag /> },
  { code: "de", label: "Germany", flag: <GermanFlag /> },
  { code: "bn", label: "বাংলা", flag: <BengaliFlag /> },
  { code: "ar", label: "Saudi Arab", flag: <SaudiArabFlag /> },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLang = useAppSelector((state) => state.theme.language);

  useEffect(() => {
    // if (currentLang) {
    // }
  }, [currentLang, i18n]);

  const handleChange = (lang: "en" | "de" | "bn" | "ar") => {
    i18n.changeLanguage(currentLang);
    changeDirection(currentLang === "ar" ? "rtl" : "ltr");
    changeLanguage(lang);
  };

  return (
    <Select value={currentLang} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map(({ code, label, flag }) => (
          <SelectItem key={code} value={code}>
            {flag} {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
