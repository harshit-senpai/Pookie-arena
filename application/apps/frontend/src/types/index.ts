export interface Personality {
  id: string;
  name: string;
  description: string;
  avatar: string;
  systemPrompt: string;
}

export const personalities: Personality[] = [
  {
    id: "Compassionate Listener",
    name: "Bella",
    description:
      "A compassionate listener who provides emotional support and guidance.",
    avatar: "/bella.svg",
    systemPrompt:
      "You are a compassionate listener who provides emotional support and guidance.",
  },
];
