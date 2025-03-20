export const handleTime = (time: number) => {
  time = Math.round(time);

  const sec = time % 60;
  const min = Math.floor(time / 60) % 60;

  const seconds = sec < 10 ? `0${sec}` : `${sec}`;
  const minutes = min < 10 ? `0${min}` : `${min}`;

  const timeString = `${minutes}:${seconds}`;
  return timeString;
};
