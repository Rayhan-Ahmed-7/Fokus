import { toast as sonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

class Toast {

    private showToast(type: ToastType, message: string, duration?: number) {
        switch (type) {
            case "success":
                sonner.success("Success", { description: message, duration: duration });
                break;
            case "error":
                sonner.error("Error", { description: message, duration: duration });
                break;
            case "warning":
                sonner.warning("Warning", { description: message, duration: duration });
                break;
            case "info":
                sonner.info("Info", { description: message, duration: duration });
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