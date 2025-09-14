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
import { changeDirection } from "../store/slices/themeSlice";

const languages = [
  { code: "en", label: "English", flag: <EnglishFlag /> },
  { code: "de", label: "Germany", flag: <GermanFlag /> },
  { code: "bn", label: "বাংলা", flag: <BengaliFlag /> },
  { code: "ar", label: "Saudi Arab", flag: <SaudiArabFlag /> },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    changeDirection(lang === "ar" ? "rtl" : "ltr");
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
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
