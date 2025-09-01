import i18n from ".";

export const T = (key: string, ns: string = "common") => i18n.t(key, { ns });
