import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { AppState } from "@/core/store";

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSelector((state: AppState) => state.theme.current);

  return (
    <Sonner
      theme={theme}
      richColors
      closeButton
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground",
          description: "text-foreground"
        }
      }}
      icons={{
        success: <CheckCircle2 />,
        error: <XCircle />,
        info: <Info />,
        warning: <AlertTriangle />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
