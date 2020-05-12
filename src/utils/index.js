// eslint-disable-next-line import/prefer-default-export
export const sec2time = (secondsDuration) => {
  const totalSeconds = parseInt(secondsDuration, 10);

  const hoursRemain = Math.floor(totalSeconds / 60 / 60);
  const minutesRemain = Math.floor((totalSeconds - (hoursRemain * 60 * 60)) / 60);
  const secondsRemain = totalSeconds - (hoursRemain * 60 * 60) - (minutesRemain * 60);

  const h = hoursRemain.toString();
  const m = minutesRemain.toString();
  const s = secondsRemain.toString();

  return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
};
