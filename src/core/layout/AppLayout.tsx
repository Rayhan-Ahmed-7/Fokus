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
      <main className="flex-1 overflow-auto p-6">
        <SidebarTrigger />
        <BreadcrumbsComponent matches={matches} />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
