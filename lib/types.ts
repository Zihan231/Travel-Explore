export type Bilingual = { en: string; bn: string };

export type Category =
  | "nature"
  | "beach"
  | "heritage"
  | "hill"
  | "forest"
  | "adventure";

export type Budget = "budget" | "mid" | "premium";
export type Rarity = "common" | "rare" | "legendary";

export interface Place {
  id: string;
  slug: string;
  name: Bilingual;
  location: Bilingual;
  division: string;
  category: Category;
  rarity: Rarity;
  image: string;
  gallery: string[];
  why: Bilingual;
  bestTime: Bilingual;
  budget: Budget;
  mission: Bilingual[];
  howToReach: RouteStep[];
  tips: Bilingual[];
  coords: { x: number; y: number }; // % position on stylized map
  lat: number;
  lng: number;
  visitors: number;
  collected: boolean; // has current user collected this stamp
}

export interface RouteStep {
  from: Bilingual;
  mode: Bilingual;
  cost: Bilingual;
  duration: Bilingual;
}

export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: Bilingual;
  verified?: boolean;
}

export type ReactionType = "love" | "wow" | "fire" | "clap" | "sad";

export interface Post {
  id: string;
  author: Author;
  place?: Bilingual;
  type: "post" | "spot";
  status?: "pending" | "approved" | "rejected";
  text: Bilingual;
  media: { type: "image" | "video"; url: string }[];
  createdAt: string;
  reactions: Record<ReactionType, number>;
  myReaction?: ReactionType | null;
  comments: number;
  shares: number;
  route?: RouteStep[];
}

export interface Reel {
  id: string;
  author: Author;
  place: Bilingual;
  caption: Bilingual;
  poster: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
}

export interface LeaderUser {
  rank: number;
  name: string;
  username: string;
  avatar: string;
  stamps: number;
  points: number;
  level: Bilingual;
  trend: "up" | "down" | "same";
}

export interface AppNotification {
  id: string;
  type: "reaction" | "comment" | "approval" | "mission" | "follow" | "badge";
  actor?: string;
  avatar?: string;
  text: Bilingual;
  time: string;
  read: boolean;
}

export interface Mission {
  id: string;
  title: Bilingual;
  desc: Bilingual;
  target: number;
  progress: number;
  reward: Bilingual;
  season?: boolean;
}
