import { Link, type AnyRouteMatch } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type BreadcrumbsProps = {
  matches: AnyRouteMatch[];
};

type BreadcrumbData = {
  breadcrumb?: string;
};

const formatLabel = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "Home";
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BreadcrumbsComponent = ({ matches }: BreadcrumbsProps) => {
  const { t } = useTranslation("menu");

  const filteredMatches = matches.filter(
    (match) => match.routeId !== "__root__"
  );

  return (
    <Breadcrumb className="flex items-center text-sm text-gray-600 space-x-1">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/" className="flex items-center hover:text-blue-600">
            <Home className="w-4 h-4 mr-1" />
            {t("home")}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {filteredMatches.map((match) => {
        // Cast match to include loader data
        const data = (match as AnyRouteMatch & { data?: BreadcrumbData }).data;
        console.log(data, match);
        const label = data?.breadcrumb
          ? t(data.breadcrumb)
          : formatLabel(match.pathname ?? "");

        return (
          <BreadcrumbItem key={match.id} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            <BreadcrumbLink asChild>
              <Link
                to={match.pathname}
                className="hover:text-blue-600 hover:underline"
              >
                {label}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
