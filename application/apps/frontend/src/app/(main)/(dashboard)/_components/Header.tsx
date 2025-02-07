import { ModeToggle } from "@/components/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 h-16 rounded-md border border-sidebar-border bg-sidebar p-2 px-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-medium text-muted-foreground dark:text-white">
          AI Homie
        </h2>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SidebarTrigger className="-ml-1" />
        </div>
      </div>
    </header>
  );
};
