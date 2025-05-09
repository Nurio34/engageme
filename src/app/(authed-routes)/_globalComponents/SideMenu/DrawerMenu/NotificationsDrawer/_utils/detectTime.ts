const MS_PER_DAY = 1000 * 60 * 60 * 24;

export interface TimeFlags {
  isNew: boolean;
  isYesterday: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
}

function atMidnight(d: Date): Date {
  const m = new Date(d);
  m.setHours(0, 0, 0, 0);
  return m;
}

export function detectTime(date: Date): TimeFlags {
  const todayMid = atMidnight(new Date());
  const targetMid = atMidnight(date);

  const diffDays = Math.floor(
    (todayMid.getTime() - targetMid.getTime()) / MS_PER_DAY
  );

  const isNew = diffDays === 0;
  const isYesterday = diffDays === 1;

  const todayDow = todayMid.getDay();
  const monOffset = (todayDow + 6) % 7;
  const weekStart = new Date(todayMid);
  weekStart.setDate(weekStart.getDate() - monOffset);

  const isThisWeek = targetMid >= weekStart && diffDays <= 6;

  const isThisMonth =
    targetMid.getFullYear() === todayMid.getFullYear() &&
    targetMid.getMonth() === todayMid.getMonth();

  return { isNew, isYesterday, isThisWeek, isThisMonth };
}
