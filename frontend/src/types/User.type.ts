export interface User {
  id: string;
  username: string;
  email: string;
  picture: string;
  cover: string;
  first_name: string;
  last_name: string;
  pronoun: string;
  optional_gender: string;
  token: string;
  verified: boolean;
  savedPosts: {
    post: string;
    savedAt: Date;
  }[];
  search: {
    user: {
      _id: string;
      email: string;
      username: string;
      picture: string;
    };
    savedAt: Date;
  }[];
}
