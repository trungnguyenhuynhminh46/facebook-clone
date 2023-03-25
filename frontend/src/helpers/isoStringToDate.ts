import { format } from "date-fns";

const isoStringToDate = (isoString: string) => {
  const formattedDate = format(new Date(isoString), "MMMM d 'at' h:mm a");
  return formattedDate;
};

export default isoStringToDate;
