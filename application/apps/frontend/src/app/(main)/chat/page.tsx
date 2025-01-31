import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Menu, Send } from "lucide-react";

export default function ChatPage() {
  return (
    <section className="h-[calc(100vh-9rem)]">
      <main className="flex flex-col mt-2 h-full overflow-y-auto relative">
        <div className="flex-1 overflow-y-auto pt-8 max-w-xl mx-auto w-full">
          <div className="h-full w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 items-center">
              <Avatar className="size-16">
                <AvatarImage src="./bella.svg" />
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              <p className="text-md font-medium text-center dark:text-primary text-gray-700">
                Bella
              </p>
              <p className="text-sm font-normal text-center text-muted-foreground">
                Compassionate Listener
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto px-2 w-full relative z-10 pb-3">
          <Input
            className="w-full border-gray-300 rounded-full h-12 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent dark:border-zinc-600"
            placeholder="Let's Talk"
          />
          <Button
            className="absolute right-3 top-6 -translate-y-1/2 border border-border rounded-full bg-blue-500 hover:bg-muted-foreground/20 dark:bg-white"
            variant={"ghost"}
            size={"icon"}
          >
            <Send className="w-6 h-6 dark:text-gray-600 text-white" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="absolute right-3 top-6 -translate-y-1/2 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-zinc-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-sidebar">
            <DropdownMenuItem>
              <Button variant={"ghost"} size={"sm"}>
                Wallpaper
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </main>
    </section>
  );
}
