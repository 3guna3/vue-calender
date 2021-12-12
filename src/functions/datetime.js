export const getTimeIntervalList = () => {
  // 15分間隔のリストを返す
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map((hour) => minutes.map((minutes) => hour + ':' + minutes)).flat();
  return timeList;
};
