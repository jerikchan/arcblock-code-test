import { dayjs } from '/@/utils/dayjs';

export function time(value) {
  return dayjs.utc(value).format('MMMM DD, YYYY h:mm:ss A' + ' UTC');
}

export function timeOfSecond(value) {
  return time(value * 1000);
}

export function thousandSeparator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function auto(value) {
  if (typeof value === 'number') {
    return thousandSeparator(value);
  }
  return value;
}

export function noop(value) {
  return value;
}

export function BTC(value) {
  return `${value / 100000000} BTC`;
}

export function hash(value) {
  return `${value.slice(0, 6)}-${value.slice(-6)}`;
}

export default {
  time,
  timeOfSecond,
  thousandSeparator,
  auto,
  noop,
  BTC,
  hash,
};
