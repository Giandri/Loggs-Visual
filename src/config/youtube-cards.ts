export interface YoutubeCard {
  id: string;
  type: "youtube" | "maps" | "iframe";
  youtubeId?: string;
  url?: string;
  title: string;
  initialPosition?: { x: string; y: string };
  initialRotation?: number;
}

export const youtubeCards: YoutubeCard[] = [
  {
    id: "1",
    type: "youtube",
    youtubeId: "Q_MZ79uFtD4",
    title: "New Project",
    initialPosition: { x: "60%", y: "30%" },
    initialRotation: 0,
  },
  {
    id: "2",
    type: "youtube",
    youtubeId: "7hyMAkHs5Ik", // Example YouTube ID - Rick Roll
    title: "Blokspace Vol.4",
    initialPosition: { x: "30%", y: "30%" },
    initialRotation: 0,
  },
  {
    id: "3",
    type: "youtube",
    youtubeId: "YuP1ZMM8-g0", // Example YouTube ID
    title: "Blokspace Vol.4",
    initialPosition: { x: "60%", y: "62%" },
    initialRotation: 0,
  },
];
