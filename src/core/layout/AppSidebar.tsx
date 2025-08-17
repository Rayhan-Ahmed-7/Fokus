import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "./ThemeSwitcher";
import { Target } from "lucide-react";
import { menuData } from "./menu";
import { renderMenu } from "./renderMenu";

const AppSidebar = () => {
  return (
    <Sidebar className="h-full">
      {/* Header */}
      <SidebarHeader className="flex items-center gap-2 px-4 py-3 border-b">
        <Target className="w-6 h-6 text-primary" />
        <span className="text-lg font-bold tracking-tight">Fokus</span>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent className="overflow-auto">
        {renderMenu(menuData)}
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className="p-3 border-t">
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
