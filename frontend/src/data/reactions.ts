const reactions: {
  [key: string]: {
    id: number;
    name: string;
    color: string;
  };
} = {
  like: {
    id: 0,
    name: "like",
    color: "rgb(32, 120, 244)",
  },
  love: {
    id: 1,
    name: "love",
    color: "rgb(243, 62, 88)",
  },
  haha: {
    id: 2,
    name: "haha",
    color: "rgb(247, 177, 37)",
  },
  wow: {
    id: 3,
    name: "wow",
    color: "rgb(247, 177, 37)",
  },
  sad: {
    id: 4,
    name: "sad",
    color: "rgb(247, 177, 37)",
  },
  angry: {
    id: 5,
    name: "angry",
    color: "rgb(233, 113, 15)",
  },
};

export default reactions;
