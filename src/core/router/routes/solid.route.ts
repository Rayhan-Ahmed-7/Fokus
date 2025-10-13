import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import SRPPage from "@/features/solid/srp/view/SrpPage";
import OCPPage from "@/features/solid/ocp/view/OcpPage";
import LSPPage from "@/features/solid/lsp/view/LspPage";
import ISPPage from "@/features/solid/isp/view/IspPage";
import DIPPage from "@/features/solid/dip/view/DipPage";

// SOLID parent
export const solidRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "solid",
  staticData: {
    breadcrumb: "solid",
  },
});

// Children
export const srpRoute = createRoute({
  getParentRoute: () => solidRoute,
  path: "single-responsibility",
  component: SRPPage,
  staticData: {
    breadcrumb: "solid.singleResponsibility",
  },
});

export const ocpRoute = createRoute({
  getParentRoute: () => solidRoute,
  path: "open-closed",
  component: OCPPage,
  staticData: {
    breadcrumb: "solid.openClosed",
  },
});

export const lspRoute = createRoute({
  getParentRoute: () => solidRoute,
  path: "liskov-substitution",
  component: LSPPage,
  staticData: {
    breadcrumb: "solid.liskovSubstitution",
  },
});

export const ispRoute = createRoute({
  getParentRoute: () => solidRoute,
  path: "interface-segregation",
  component: ISPPage,
  staticData: {
    breadcrumb: "solid.interfaceSegregation",
  },
});

export const dipRoute = createRoute({
  getParentRoute: () => solidRoute,
  path: "dependency-inversion",
  component: DIPPage,
  staticData: {
    breadcrumb: "solid.dependencyInversion",
  },
});
