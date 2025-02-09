import { MusicPlaylist } from "@/types";
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

export const Music: MusicPlaylist[] = [
  {
    playlist: "Instrumental",
    thumbnail: "meditation-1.png",
    songs: [
      {
        id: "instrumental-1",
        thumbnail: "/assets/Instrumental-thumb.jpg",
        music: "/assets/audio/Instrumental-1.mp3",
        name: "Healing Meditation",
        duration: "10:09",
      },
      {
        id: "instrumental-2",
        thumbnail: "/assets/Instrumental-thumb.jpg",
        music: "/assets/audio/Instrumental-2.mp3",
        name: "Calm Music",
        duration: "15:23",
      },
    ],
  },
  {
    playlist: "Natural",
    thumbnail: "meditation-2.png",
    songs: [
      {
        id: "natural-1",
        thumbnail: "/assets/Instrumental-thumb.jpg",
        music: "/assets/audio/natural-1.mp3",
        name: "Inner Peace",
        duration: "10:15",
      },
      {
        id: "natural-2",
        thumbnail: "/assets/Instrumental-thumb.jpg",
        music: "/assets/audio/natural-2.mp3",
        name: "Calm Music",
        duration: "15:00",
      },
    ],
  },
  {
    playlist: "Guided",
    thumbnail: "meditation-3.png",
    songs: [
      {
        id: "guided-1",
        thumbnail: "/assets/Instrumental-thumb.jpg",
        music: "/assets/audio/guided-1.mp3",
        name: "Gratitude and Joy",
        duration: "10:53",
      },
    ],
  },
];
