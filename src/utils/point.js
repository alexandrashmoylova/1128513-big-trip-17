import dayjs from 'dayjs';

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const humanizePointDueDateYear = (dueDate) => dayjs(dueDate).format('YYYY MM DD');
const humanizePointDueDateYearTime = (dueTime) => dayjs(dueTime).format('YYYY-MM-DDTHH:mm');
const humanizePointEditDueTime = (dueTime) => dayjs(dueTime).format('DD/MM/YY HH:mm');

const diffTimeHours = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'hour');

const diffTimeMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;

const sortPointByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointByDuration = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationPointB - durationPointA;
};

const isPointInFuture = (date) => {
  const today = dayjs();
  return dayjs(date).diff(today, 'days') > 0;
};

const isPointInPast = (date) => {
  const today = dayjs();
  return dayjs(today).diff(dayjs(date)) > 0;
};

export {humanizePointDueDate, humanizePointDueTime, humanizePointDueDateYear, humanizePointDueDateYearTime, diffTimeHours, diffTimeMinutes, humanizePointEditDueTime, sortPointByPrice, sortPointByDay, sortPointByDuration, isPointInFuture, isPointInPast};
