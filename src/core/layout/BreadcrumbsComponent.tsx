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
    <Breadcrumb className="items-center text-sm text-gray-600 space-x-1 md:flex hidden">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/" className="flex items-center hover:text-blue-600">
            <Home className="w-4 h-4 mr-1" />
            {t("home")}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {filteredMatches.map((match) => {
        // pull breadcrumb from staticData
        const label = match.staticData?.breadcrumb
          ? t(match.staticData.breadcrumb)
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
