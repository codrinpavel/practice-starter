export default function (date) {
  const formatted = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

  return formatted.replace(
    /de ([a-záéíóúñ]+) de/,
    (_, month) =>
      `de ${month.charAt(0).toUpperCase() + month.slice(1)} de`
  );
}