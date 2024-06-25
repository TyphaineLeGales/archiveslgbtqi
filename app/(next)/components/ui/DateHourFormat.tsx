import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateHourFormat({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  const date = new Date(dateString);
  return (
    <time dateTime={dateString} className={className}>
      {format(date, "d MMMM yyyy", { locale: fr })}&nbsp;à&nbsp;
      {format(date, "HH:mm", { locale: fr })}
    </time>
  );
}
