export interface Comment {
  _id: string;
  user: string;
  text: string;
  image?: string;
  post: string;
  parrentComment: string | null;
  childrenComments: string[];
  reactionInfo: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  reactions: string[];
  createdAt: string;
  updatedAt: string;
}
