export const fancyTime = (date: Date) => {
  const now = Date.now();
  const time = new Date(date).getTime();

  const diffInSeconds = Math.floor((now - time) / 1000);

  const units = [
    { label: "year", seconds: 31557600, short: "y" },
    { label: "month", seconds: 2629800, short: "mo" },
    { label: "week", seconds: 604800, short: "w" },
    { label: "day", seconds: 86400, short: "d" },
    { label: "hour", seconds: 3600, short: "h" },
    { label: "minute", seconds: 60, short: "m" },
    { label: "second", seconds: 1, short: "s" },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value > 0) {
      return {
        short: `${value}${unit.short}`,
        long: `${value} ${unit.label}${value > 1 ? "s" : ""} ago`,
      };
    }
  }

  return { short: "just now", long: "just now" };
};
