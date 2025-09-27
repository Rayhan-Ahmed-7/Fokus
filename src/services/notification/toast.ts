import i18n from "@/core/i18";
import { toast as sonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

class Toast {
  private showToast(type: ToastType, message: string, duration?: number) {
    const t = i18n.t.bind(i18n);
    switch (type) {
      case "success":
        sonner.success(t("common:success"), {
          description: message,
          duration: duration,
        });
        break;
      case "error":
        sonner.error(t("common:error"), {
          description: message,
          duration: duration,
        });
        break;
      case "warning":
        sonner.warning(t("common:warning"), {
          description: message,
          duration: duration,
        });
        break;
      case "info":
        sonner.info(t("common:info"), {
          description: message,
          duration: duration,
        });
        break;
      default:
        throw new Error("Invalid toast type");
    }
  }

  success(message: string, duration?: number) {
    this.showToast("success", message, duration);
  }

  error(message: string, duration?: number) {
    this.showToast("error", message, duration);
  }

  warning(message: string, duration?: number) {
    this.showToast("warning", message, duration);
  }

  info(message: string, duration?: number) {
    this.showToast("info", message, duration);
  }
}

export const toast = new Toast();
