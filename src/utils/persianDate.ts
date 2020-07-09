import moment from 'moment-jalaali';
import {persianNumber} from './persianNumber';

const pd = (d: number) => {
  const m = moment(d);

  let diff = -m.diff(moment.now(), 'minute');
  if (diff < 60) {
    return `${diff} دقیقه پیش`;
  }
  diff = -m.diff(moment.now(), 'hour');
  if (diff < 24) {
    return `${diff} ساعت پیش`;
  }
  diff = -m.diff(moment.now(), 'day');
  if (diff < 7) {
    return `${diff} روز پیش`;
  }
  diff = -m.diff(moment.now(), 'week');
  if (diff < 4) {
    return `${diff} هفته پیش`;
  }
  diff = -m.diff(moment.now(), 'month');
  if (diff < 12) {
    return `${diff} ماه پیش`;
  }
  diff = -m.diff(moment.now(), 'year');
  return `${diff} سال پیش`;
};

export const persianDate = (d: number) => persianNumber(pd(d));
