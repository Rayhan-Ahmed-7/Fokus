import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Outlet, useMatches } from "@tanstack/react-router";
import BreadcrumbsComponent from "./BreadcrumbsComponent";

const AppLayout = () => {
  const matches = useMatches();
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="flex items-center gap-4 mb-4 p-6 pb-0">
          <SidebarTrigger className="cursor-pointer" />
          <BreadcrumbsComponent matches={matches} />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
