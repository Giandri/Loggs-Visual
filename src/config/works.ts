export interface WorkItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  year?: string;
}

export const worksItems: WorkItem[] = [
  {
    id: 1,
    title: "Concert Photography",
    description: "Live concert capture with dynamic lighting and crowd energy",
    imageUrl: "/gallery/TMB-1.PNG",
    category: "Photography",
    year: "2025",
  },
  {
    id: 2,
    title: "Band Session",
    description: "Intimate studio session with local band recording their latest track",
    imageUrl: "/gallery/TMB-2.JPG",
    category: "Studio",
    year: "2025",
  },
  {
    id: 3,
    title: "Festival Coverage",
    description: "Multi-day music festival photography capturing various performances",
    imageUrl: "/gallery/TMB-3.jpg",
    category: "Event",
    year: "2025",
  },
];
