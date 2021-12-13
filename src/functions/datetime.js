import { format, addHours } from 'date-fns';

export const getTimeIntervalList = () => {
  // 15分間隔のリストを返す
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map((hour) => minutes.map((minutes) => hour + ':' + minutes)).flat();
  return timeList;
};

export const getDefaultStartAndEnd = (date) => {
  // デフォルトの開始時刻と終了時刻を返す
  // 現在の時刻を取り出す
  const currentTime = format(new Date(), 'HH:mm:ss');
  // 今日の日付と現在時刻を組み合わせる
  const datetime = new Date(`${date} ${currentTime}`);
  // 現在時刻から1時間後をデフォルトのstartとする
  const start = format(addHours(datetime, 1), 'yyyy/MM/dd HH:00:00');
  // 現在時刻から2時間後をデフォルトのendとする
  const end = format(addHours(datetime, 2), 'yyyy/MM/dd HH:00:00');
  return [start, end];
};
