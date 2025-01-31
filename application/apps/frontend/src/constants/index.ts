import {
  Gamepad2,
  Gem,
  LucideFileChartColumnIncreasing,
  MessageCircleMore,
  NotebookIcon,
  NotepadText,
  Settings,
  SquareActivity,
} from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Homie",
      url: "/chat",
      icon: MessageCircleMore,
      isActive: true,
    },
    {
      title: "Gaming Zone",
      url: "/gaming",
      icon: Gamepad2,
      isActive: false,
    },
    {
      title: "Meditation Zone",
      url: "/meditation",
      icon: SquareActivity,
      isActive: false,
    },
    {
      title: "Daily Journal",
      url: "/journal",
      icon: NotepadText,
      isActive: false,
    },
    {
      title: "Personalty Test",
      url: "/personality",
      icon: NotebookIcon,
      isActive: false,
    },
    {
      title: "Rewards",
      url: "/rewards",
      icon: Gem,
      isActive: false,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: LucideFileChartColumnIncreasing,
      isActive: false,
    },
  ],
  footer: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: false,
    },
  ],
};
