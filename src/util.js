import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const humanizePointDueDateYear = (dueDate) => dayjs(dueDate).format('YYYY MM DD');
const humanizePointDueDateYearTime = (dueTime) => dayjs(dueTime).format('YYYY-MM-DDTHH:mm');

const diffTimeHours = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'hour');

const diffTimeMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;

export {getRandomInteger, getRandomArrayElement, humanizePointDueDate, humanizePointDueTime, humanizePointDueDateYear, humanizePointDueDateYearTime, diffTimeHours, diffTimeMinutes};
