import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { Header } from "./_components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="m-2 w-full">
        <Header />
        <div className="h-4"></div>
        <ScrollArea className="h-[calc(100vh-6rem)] rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
          <div className="h-full">{children}</div>
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};
export default ChatLayout;
