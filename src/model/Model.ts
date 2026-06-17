import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const imageBaseUrl = `https://s3.us-west-2.amazonaws.com/images.vtccontrol.com`;

abstract class Model {
  protected resolveImage(path: string | undefined | null) {
    return `${imageBaseUrl}/${path}`;
  }

  protected toDate(date: Date, dateFormat: string = "dd/MM/yyyy ") {
    return date ? formatDistanceToNow(date, { locale: fr }) : "-";
  }

  protected formatDate(date: Date, dateFormat: string = "dd/MM/yyyy"): string {
    try {
      return format(date, dateFormat);
    } catch (e) {
      return "";
    }
  }

  protected getAdminImage(path?: string | null) {
    return path ? this.resolveImage(path) : "/assets/admin-default-cover.png";
  }

  protected getFleetImage(path?: string | null) {
    return path ? this.resolveImage(path) : "/assets/default-fleet-logo.png";
  }

  protected formatRelativeOrAbsoluteDate(dateInput: string): string {
    if (!dateInput) return "";

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return dateInput;

    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffTime = startOfTarget.getTime() - startOfToday.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timeString = `${hours}h${minutes}`;

    if (diffDays === 0) {
      return `aujourd'hui à ${timeString}`;
    } else if (diffDays === -1) {
      return `hier à ${timeString}`;
    } else if (diffDays === -2) {
      return `il y a deux jours à ${timeString}`;
    }

    const diffInMs = now.getTime() - date.getTime();
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.4375));

    if (diffInMs > 0) {
      if (diffInWeeks === 1) return "il y a une semaine";
      if (diffInMonths === 1) return "il y a un mois";
      if (diffInMonths > 1 && diffInMonths < 12) return `il y a ${diffInMonths} mois`;
    }

    const day = date.getDate();
    let month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = date.getFullYear();

    return `${day} ${month} ${year} à ${timeString}`;
  }

  protected formatDateTime(date: string): string {
    if (!date) return "";

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return date;

    const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDate = dateFormatter.format(dateObj).replace(".", "");
    const formattedTime = timeFormatter.format(dateObj).replace(":", "h");

    const parts = formattedDate.split(" ");
    if (parts[1]) {
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    }

    return `${parts.join(" ")} à ${formattedTime}`;
  }


  public getDifferenceInDays(dateLeft: Date, dateRight: Date): number {
    return differenceInDays(dateLeft, dateRight);
  }

  protected capitalizeFirstLetter(sentence: string | undefined): string {
    if (sentence) {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }
    return sentence ?? "";
  }

  protected arroundNumb(nombre: number): string {
    const partieEntiere: number = Math.floor(nombre);
    const partieDecimal: string = (nombre - Math.floor(nombre))
      .toFixed(2)
      .substring(1);
    return partieEntiere.toString() + partieDecimal;
  }
}

type DataItem = {
  [key: string]: any;
};

export function searchAndFilter<T extends DataItem>(
  data: T[],
  searchTerm: string,
  keys: (keyof T)[],
): T[] {
  const lowercasedSearchTerm = searchTerm.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowercasedSearchTerm);
      }
      return false;
    }),
  );
}

export default Model;
