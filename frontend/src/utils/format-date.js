export default (date) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return new Date(date).toLocaleString("en-US", options);
};
