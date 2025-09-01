import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "./ThemeSwitcher";
import { menuData } from "./menu";
import { renderMenu } from "./renderMenu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const AppSidebar = () => {
  const { t } = useTranslation("menu");
  return (
    <Sidebar className="h-full">
      {/* Header */}
      <SidebarHeader className="flex items-center gap-2 px-4 py-3 border-b">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/fav.png" />
        </Avatar>
        <span className="text-xl tracking-widest font-bold">Fokus App</span>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent className="overflow-auto">
        {renderMenu(menuData, t)}
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className="p-3 border-t">
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
