"use client";

import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants";
import { AvatarImage } from "@radix-ui/react-avatar";
import { usePathname, useRouter } from "next/navigation";

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="data-[state=open]: my-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage src="/user.svg" />
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold">XOXO</span>
              </div>
            </SidebarMenuButton>
            <Separator className="my-3" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {sidebarData.navMain.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => router.push(item.url)}
                className={`${pathname === item.url ? "bg-blue-500 text-sidebar-accent dark:text-primary hover:bg-blue-500 hover:text-sidebar-accent" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="ml-2">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {sidebarData.footer.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton tooltip={item.title}>
                <item.icon className="h-5 w-5" />
                <span className="ml-2">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
