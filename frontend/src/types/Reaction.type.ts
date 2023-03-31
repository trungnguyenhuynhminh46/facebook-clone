export interface Reaction {
  reaction: "like" | "love" | "haha" | "wow" | "sad" | "angry";
  user: string;
  post?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
