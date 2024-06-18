// create a component to format this kind of date 2024-06-27T15:15:00.000Z

import { format } from "date-fns";

export default function DateFormat({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  const date = new Date(dateString);
  return (
    <time dateTime={dateString} className={className}>
      {format(date, "LLLL d, yyyy")} - {format(date, "h:mm a")}
    </time>
  );
}
