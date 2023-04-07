import { format, formatDistanceStrict } from "date-fns";

export const isoStringToDate = (isoString: string, formatString: string) => {
  const formattedDate = format(new Date(isoString), formatString);
  return formattedDate;
};

export function getTimeDiff(date: Date): string {
  const diff = new Date().getTime() - date.getTime();
  if (diff < 0) {
    return "Invalid date";
  }
  if (diff < 1000) {
    return "Just now";
  }
  let result = formatDistanceStrict(date, new Date());
  result = result.replace(/(\d+) years?/, "$1y");
  result = result.replace(/(\d+) months?/, "$1m");
  result = result.replace(/(\d+) weeks?/, "$1w");
  result = result.replace(/(\d+) days?/, "$1d");
  result = result.replace(/(\d+) hours?/, "$1h");
  result = result.replace(/(\d+) minutes?/, "$1m");
  result = result.replace(/(\d+) seconds?/, "$1s");
  const array = result.split(" ");
  if (array.length > 1) {
    result = array[0] + array[1][0];
  }
  return result;
}
