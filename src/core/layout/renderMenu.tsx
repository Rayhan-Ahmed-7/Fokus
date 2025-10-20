import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import { ChevronRight } from "lucide-react";
import type { ComponentType } from "react";
import React from "react";

export type MenuItemType = {
  label: string;
  path?: string;
  icon?: ComponentType<{ className?: string }>;
  children?: MenuItemType[];
  defaultOpen?: boolean;
};

export function renderMenu(items: MenuItemType[], t: TFunction<"menu">) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        if (hasChildren) {
          const [open, setOpen] = React.useState(!!item.defaultOpen);

          return (
            <SidebarMenuItem key={item.label}>
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{t(item.label)}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200
                      ${open ? "rotate-90 rtl:rotate-90" : "rotate-0 rtl:rotate-180"}`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children!.map((child) =>
                      child.children ? (
                        <div key={child.label}>{renderMenu([child], t)}</div>
                      ) : (
                        <SidebarMenuSubItem key={child.label}>
                          <SidebarMenuButton
                            asChild
                            className="flex items-center gap-2 hover:bg-primary"
                          >
                            <Link
                              to={child.path!}
                              className={`flex items-center gap-2`}
                              activeProps={{
                                className: "bg-primary",
                              }}
                            >
                              {child.icon && <child.icon className="w-4 h-4" />}
                              {t(child.label)}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      )
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          );
        } else {
          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild className="flex items-center gap-2">
                <Link to={item.path!} className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {t(item.label)}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }
      })}
    </SidebarMenu>
  );
}
