// utils/formatDate.js

export function formatHumanReadableDate(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long", // e.g., "April"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString(undefined, options);
}
