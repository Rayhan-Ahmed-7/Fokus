import { Link, type AnyRouteMatch } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

type BreadcrumbsProps = {
  matches: AnyRouteMatch[];
};

const BreadcrumbsComponent = ({ matches }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className="text-sm text-gray-500 flex items-center">
      {matches
        .filter((match) => match.routeId !== "__root__") // skip root
        .map((match, idx) => {
          // In v1, meta is directly on the match
          const meta = match.meta as { breadcrumb?: string } | undefined;

          const label = meta?.breadcrumb ?? match.pathname ?? "Home";

          return (
            <BreadcrumbItem key={match.id} className="flex items-center">
              <BreadcrumbLink asChild>
                <Link to={match.pathname} className="hover:underline">
                  {label}
                </Link>
              </BreadcrumbLink>
              {idx < matches.length - 1 && (
                <span className="mx-1 select-none">/</span>
              )}
            </BreadcrumbItem>
          );
        })}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
