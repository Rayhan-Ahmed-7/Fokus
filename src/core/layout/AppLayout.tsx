import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Outlet, useMatches } from "@tanstack/react-router";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import { LanguageSelector } from "../i18/LanguageSelector";
import { useAppSelector } from "../store/hooks";

const AppLayout = () => {
  const matches = useMatches();
  const direction = useAppSelector((state) => state.theme.direction);

  return (
    <SidebarProvider dir={direction}>
      <div className={` flex h-screen`}>
        <AppSidebar />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="flex items-center gap-4 mb-4 p-6 pb-0">
          <div className="flex items-center gap-4 w-full">
            <SidebarTrigger className="cursor-pointer" />
            <BreadcrumbsComponent matches={matches} />
          </div>
          <LanguageSelector />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
