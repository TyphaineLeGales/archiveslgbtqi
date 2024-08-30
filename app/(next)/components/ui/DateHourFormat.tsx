import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateHourFormat({
  dateString,
  formatType = "default", // Add a formatType parameter
  className,
}: {
  dateString: string;
  formatType?: "default" | "alternative"; // Define the possible formats
  className?: string;
}) {
  const date = new Date(dateString);

  // Define the two formats
  const formattedDate =
    formatType === "alternative"
      ? `${format(date, "dd/MM yyyy", { locale: fr })} `
      : `${format(date, "d MMMM yyyy", { locale: fr })} à ${format(date, "HH'H'", { locale: fr })}`;

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  );
}
