export const days = Array.from(Array(31).keys()).map((_, i) => {
  return { content: (i + 1).toString(), value: i + 1 };
});
export const months = [
  {
    content: "Jan",
    value: 1,
  },
  {
    content: "Feb",
    value: 2,
  },
  {
    content: "Mar",
    value: 3,
  },
  {
    content: "Apr",
    value: 4,
  },
  {
    content: "May",
    value: 5,
  },
  {
    content: "Jun",
    value: 6,
  },
  {
    content: "Jul",
    value: 7,
  },
  {
    content: "Aug",
    value: 8,
  },
  {
    content: "Sep",
    value: 9,
  },
  {
    content: "Oct",
    value: 10,
  },
  {
    content: "Nov",
    value: 11,
  },
  {
    content: "Dec",
    value: 12,
  },
];
export const years = Array.from(Array(100).keys()).map((_, i) => {
  return {
    content: (new Date().getFullYear() - i).toString(),
    value: new Date().getFullYear() - i,
  };
});
