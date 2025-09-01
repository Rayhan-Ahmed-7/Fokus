import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import EnglishFlag from "@/assets/flags/united-kingdom.svg?react";
import GermanFlag from "@/assets/flags/germany.svg?react";
import BengaliFlag from "@/assets/flags/bangladesh.svg?react";

const languages = [
  { code: "en", label: "English", flag: <EnglishFlag /> },
  { code: "de", label: "Germany", flag: <GermanFlag /> },
  { code: "bn", label: "বাংলা", flag: <BengaliFlag /> },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang; // update <html lang="..">
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
