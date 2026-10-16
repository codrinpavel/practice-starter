export default function (content = "") {
  const text = content
    .replace(/<[^>]*>/g, " ")
    .replace(/{%[\s\S]*?%}/g, " ")
    .replace(/{{[\s\S]*?}}/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#*_>`~\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return minutes;
}