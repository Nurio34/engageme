export const detectTime = (date: Date) => {
  const isNewFn = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };
  const isNew = isNewFn(new Date(date));

  const isYesterdayFn = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate()
    );
  };
  const isYesterday = isYesterdayFn(new Date(date));

  const isThisWeekFn = (date: Date) => {
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return date >= startOfWeek && date <= endOfWeek;
  };
  const isThisWeek = isThisWeekFn(new Date(date));

  const isThisMonthFn = (date: Date) => {
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  };
  const isThisMonth = isThisMonthFn(new Date(date));

  return { isNew, isYesterday, isThisWeek, isThisMonth };
};
