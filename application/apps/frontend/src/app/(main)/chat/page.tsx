import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Send } from "lucide-react";

const ChatPage = () => {
    return (
        <section className="h-full w-full flex flex-col">
            <header className="h-16 w-full border-b border-border bg-gradient-to-r from-[#FE9F34]/40 to-[#F04DD4]/70">
                <div className="h-full w-full px-6 flex items-center justify-between">
                    <Button variant={"ghost"} size={"icon"} className="rounded-full">
                        <Menu />
                    </Button>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback>KS</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto pt-8 max-w-xl mx-auto w-full">
                <div className="h-full w-full flex flex-col items-center">
                    <div className="flex flex-col gap-2 items-center">
                        <Avatar className="size-16">
                            <AvatarImage src="./bella.svg" />
                            <AvatarFallback>BK</AvatarFallback>
                        </Avatar>
                        <p className="text-md font-medium text-center text-gray-700">Bella</p>
                        <p className="text-sm font-normal text-center text-muted-foreground">Compassionate Listener</p>
                    </div>
                </div>
            </div>
            <div className="max-w-xl mx-auto w-full py-8 relative">
                <Input className="w-full border-gray-300 rounded-full h-12" placeholder="Let's Talk" />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-muted hover:bg-muted-foreground/20" variant={"ghost"} size={"icon"}>
                    <Send className="w-6 h-6 text-gray-600" />
                </Button>
            </div>
        </section>
    )
}
export default ChatPage;