export default function (collection) {
  return [...collection].sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });
}