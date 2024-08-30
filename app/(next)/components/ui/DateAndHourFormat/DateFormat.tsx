// DateComponent.tsx
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface DateComponentProps {
  dateString: string; // Expecting date in 'YYYY-MM-DD' format
  formatType: "default" | "noYear" | "full" | "fullNoYear"; // Define the possible formats
}

const DateComponent: React.FC<DateComponentProps> = ({
  dateString,
  formatType,
}) => {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Format the date to 'DD-MM-YYYY' using date-fns
  // const formattedDate = format(date, "dd/MM yyyy", { locale: fr });
  let formattedDate = "";
  switch (formatType) {
    case "noYear":
      formattedDate = `${format(date, "dd/MM", { locale: fr })}`;
      break;
    case "full":
      // formattedDate = `${format(date, "dd/MM yyyy", { locale: fr })}`;
      // write like so 11 janvier 2022
      formattedDate = `${format(date, "d MMMM yyyy", { locale: fr })}`;
      break;
    case "fullNoYear":
      formattedDate = `${format(date, "d MMMM", { locale: fr })}`;
      break;
    default:
      formattedDate = `${format(date, "dd/MM yyyy", { locale: fr })}`;
      break;
  }

  return <>{formattedDate}</>;
};

export default DateComponent;
