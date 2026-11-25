import { format, formatDistanceToNow, isValid } from "date-fns";

export { cn } from "cn";

export const getInitials = (name: string) => {
  const trimmed = name?.trim();
  if (!trimmed) return "NA";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export const formatDate = (
  date: string | number | Date | null | undefined,
  pattern: string = "dd MMM, yyyy"
): string => {
  if (!date) return "—";
  const parsedDate =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (!isValid(parsedDate)) return "—";
  return format(parsedDate, pattern);
};

export const formatDateTime = (
  date: string | number | Date | null | undefined,
  pattern: string = "dd MMM, yyyy • hh:mm a"
): string => {
  return formatDate(date, pattern);
};

export const formatRelativeTime = (
  date: string | number | Date | null | undefined
): string => {
  if (!date) return "—";
  const parsedDate =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (!isValid(parsedDate)) return "—";
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};
