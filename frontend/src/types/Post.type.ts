export interface Post {
  _id: string;
  type: "onlyText" | "cover" | "withImages";
  user: {
    _id: string;
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    picture: string;
    username: string;
  };
  text?: string;
  coverId?: number;
  imagesList?: string[];
  isSharedTo: "public" | "friends" | "onlyMe";
  isFeeling?: string;
  checkedOutAt?: string;
  tagedFriends: string[];
  reactionsInfo: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  reactions: string[];
  comments: string[];
  sharedUsers: string[];
  createdAt: string;
  updatedAt: string;
}
