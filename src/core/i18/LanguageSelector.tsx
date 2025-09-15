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
import { changeAppLanguage, changeDirection } from "../store/slices/themeSlice";
import { useAppSelector } from "../store/hooks";
import { changeLanguage } from "i18next";
import type { Language } from "../store/types/themeTypes";

const languages = [
  { code: "en", label: "English", flag: <EnglishFlag /> },
  { code: "de", label: "Germany", flag: <GermanFlag /> },
  { code: "bn", label: "বাংলা", flag: <BengaliFlag /> },
  { code: "ar", label: "Saudi Arab", flag: <SaudiArabFlag /> },
];

export function LanguageSelector() {
  const currentLang = useAppSelector((state) => state.theme.language);

  const handleChange = (lang: Language) => {
    changeLanguage(lang);
    changeDirection(lang === "ar" ? "rtl" : "ltr");
    changeAppLanguage(lang);
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
