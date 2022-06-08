import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {TYPE} from './const.js';
import {DESTINATIONS_LIST} from './destination.js';
import { generateOffer } from './offer.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const generateDate = (dayStart, dayEnd) => {
  const daysGap = getRandomInteger(dayStart, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

const generatePoint = () => ({
  basePrice: getRandomInteger(25, 1000),
  dateFrom: generateDate(0, 4),
  dateTo: generateDate(5, 8),
  destination: getRandomArrayElement(DESTINATIONS_LIST),
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateOffer(),
  type: getRandomArrayElement(TYPE),
});

export {generatePoint};
