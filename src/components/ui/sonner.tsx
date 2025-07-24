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
        style:{
          background: "var(--background)",
          color: "var(--foreground)",
        }
      }}
      icons={{
        success: <CheckCircle2 className="text-success" />,
        error: <XCircle className="text-error" />,
        info: <Info className="text-info" />,
        warning: <AlertTriangle className="text-warning" />,
      }}
      // style={
      //   {
      //     "--normal-bg": "var(--popover)",
      //     "--normal-text": "var(--popover-foreground)",
      //     "--normal-border": "var(--border)",
      //   } as React.CSSProperties
      // }
      {...props}
    />
  )
}

export { Toaster }
