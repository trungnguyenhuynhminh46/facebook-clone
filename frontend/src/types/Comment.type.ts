export interface Comment {
  _id: string;
  user: {
    _id: string;
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    picture: string;
    username: string;
  };
  text: string;
  image?: string;
  post: string;
  parrentComment: string | null;
  childrenComments: string[];
  reactionsInfo: {
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
