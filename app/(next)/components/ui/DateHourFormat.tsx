import { format } from "date-fns";
import { fr } from "date-fns/locale";

type DateHourFormatProps = {
  dateString: string;
  formatType:
    | "default"
    | "shortDate"
    | "shortDateWithYear"
    | "shortHour"
    | "fullDate"
    | "fullDateWithYear"
    | (string & {});
  className?: string;
};

export default function DateHourFormat({
  dateString,
  formatType = "default",
  className,
}: DateHourFormatProps) {
  const date = new Date(dateString);

  const formattedDate = (() => {
    switch (formatType) {
      case "fullDate":
        return `${format(date, "d MMMM", { locale: fr })}`;
      case "fullDateWithYear":
        return `${format(date, "d MMMM yyyy", { locale: fr })}`;
      case "shortHour":
        return `${format(date, "HH'H'", { locale: fr })}`;
      case "shortDateWithYear":
        return `${format(date, "dd/MM yyyy", { locale: fr })}`;
      case "shortDate":
        return `${format(date, "dd/MM", { locale: fr })}`;
      default:
        return `${format(date, "d MMMM yyyy", { locale: fr })} à ${format(date, "HH'H'", { locale: fr })}`;
    }
  })();

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  );
}

// 12/12/2021 ENTRE 14h30 15h40
