import { format } from 'date-fns';

// serializeEventメソッドは、ストアのゲッターで行っていた処理と同じように、startDateおよびendDateを追加したeventオブジェクトを返す。
export const serializeEvent = (event) => {
  if (event === null) {
    return null;
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    ...event,
    start,
    end,
    startDate: format(start, 'yyyy/MM/dd'),
    endDate: format(end, 'yyyy/MM/dd'),
    color: event.color || '#2196F3',
  };
};
