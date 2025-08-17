import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import type { AnyRouteMatch } from "@tanstack/react-router";

type BreadcrumbsProps = {
  matches: AnyRouteMatch[];
};

const BreadcrumbsComponent = ({ matches }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className="text-sm text-gray-500">
      {matches.map((match, idx) => (
        <BreadcrumbItem key={match.id}>
          <BreadcrumbLink asChild>
            <Link
              to={match.pathname} // use pathname from match
              className="hover:underline"
            >
              {match.routeId || match.pathname || "Home"}
            </Link>
          </BreadcrumbLink>
          {idx < matches.length - 1 && (
            <span className="mx-1 select-none">/</span>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
