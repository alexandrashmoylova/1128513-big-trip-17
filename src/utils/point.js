import dayjs from 'dayjs';

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueTime = (dueTime) => dayjs(dueTime).format('HH:mm');
const humanizePointDueDateYear = (dueDate) => dayjs(dueDate).format('YYYY MM DD');
const humanizePointDueDateYearTime = (dueTime) => dayjs(dueTime).format('YYYY-MM-DDTHH:mm');

const diffTimeHours = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'hour');

const diffTimeMinutes = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute') % 60;

export {humanizePointDueDate, humanizePointDueTime, humanizePointDueDateYear, humanizePointDueDateYearTime, diffTimeHours, diffTimeMinutes};
