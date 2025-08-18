import { Link, type AnyRouteMatch } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";

type BreadcrumbsProps = {
  matches: AnyRouteMatch[];
};

const BreadcrumbsComponent = ({ matches }: BreadcrumbsProps) => {
  const filteredMatches = matches.filter(
    (match) => match.routeId !== "__root__"
  );

  return (
    <Breadcrumb className="flex items-center text-sm text-gray-600 space-x-1">
      {/* Home Icon */}
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/" className="flex items-center hover:text-blue-600">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {filteredMatches.map((match) => {
        const meta = match.meta as { breadcrumb?: string } | undefined;
        const label = meta?.breadcrumb ?? match.pathname ?? "Page";

        return (
          <BreadcrumbItem key={match.id} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            <BreadcrumbLink asChild>
              <Link
                to={match.pathname}
                className="hover:text-blue-600 hover:underline"
              >
                {label.replace("/", "").replace("-", " ")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
