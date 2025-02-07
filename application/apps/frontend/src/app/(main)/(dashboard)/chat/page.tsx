"use client";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Phone, Play, Send, Pause } from "lucide-react";
import { personalities, Personality } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Howl } from "howler";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>(
    personalities[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const soundInstance = useRef<Howl | null>(null);
  const [showCrisisOptions, setShowCrisisOptions] = useState(false);
  const router = useRouter();

  const handleMusicToggle = () => {
    if (!isPlaying) {
      // Stop any existing music
      soundInstance.current?.stop();

      // Create new Howl instance
      soundInstance.current = new Howl({
        src: [selectedPersonality.musicTrack],
        html5: true,
        volume: 0.3,
        onend: () => setIsPlaying(false),
      });

      soundInstance.current.play();
      setIsPlaying(true);
    } else {
      soundInstance.current?.pause();
      setIsPlaying(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundInstance.current?.stop();
    };
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      personalityId: selectedPersonality.id,
    },
    initialMessages: [
      {
        id: "welcome",
        content: `${selectedPersonality.name}: ${selectedPersonality.description}`,
        role: "assistant",
      },
    ],
    onFinish: (message) => {
      if (message.content.includes("deeply concerned about your safety")) {
        setShowCrisisOptions(true);
      }
    },
  });

  const handleCrisisResponse = () => {
    router.push("/local-resources");
    setShowCrisisOptions(false);
  };

  console.log(messages);

  return (
    <section className="h-[calc(100vh-9rem)]">
      <main className="flex flex-col mt-2 h-full overflow-y-auto relative">
        {/* Personality Selector */}
        <div className="max-w-xl mx-auto w-full lg:pt-6 px-4">
          <div className="flex flex-col items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-16 cursor-pointer border-2 border-primary">
                  <AvatarImage src={selectedPersonality.avatar} />
                  <AvatarFallback>{selectedPersonality.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {personalities.map((personality) => (
                  <DropdownMenuItem
                    key={personality.id}
                    onClick={() => setSelectedPersonality(personality)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={personality.avatar} />
                        <AvatarFallback>{personality.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{personality.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {personality.description}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="text-center">
              <h1 className="text-xl font-semibold">
                {selectedPersonality.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedPersonality.description}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-8 max-w-xl mx-auto w-full px-4 hide-scrollbar">
          <div className="space-y-4">
            {messages
              .filter((m) => m.role !== "system")
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-blue-500 text-primary-foreground dark:text-white rounded-br-none"
                        : "bg-green-500 rounded-tl-none text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-green-500 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce-delay-1" />
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce-delay-2" />
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <form
          className="max-w-xl mx-auto px-4 w-full sticky bottom-0 pt-4 pb-6"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              className="w-full rounded-full h-12 pr-16 shadow-lg focus-visible:ring-offset-0 focus-visible:ring-0 bg-zinc-800"
              placeholder="Share your thoughts..."
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full size-8 bg-blue-500 hover:bg-blue-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-100" />
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-200" />
                </div>
              ) : (
                <Send className="w-5 h-5 dark:text-white" />
              )}
            </Button>
          </div>
        </form>

        {showCrisisOptions && (
          <div className="max-w-xl mx-auto w-full px-4 mb-4">
            <div className="bg-red-100 p-4 rounded-lg text-red-900">
              <p className="font-semibold mb-2">Need immediate help?</p>
              <Button
                onClick={handleCrisisResponse}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Show Local Resources
              </Button>
            </div>
          </div>
        )}

        <div className="absolute top-0 xl:right-[300px] right-10 gap-4">
          <div className="flex items-center">
            <Button
              onClick={handleMusicToggle}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Phone />
            </Button>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <Menu />
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
}
