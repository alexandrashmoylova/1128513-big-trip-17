import {getRandomInteger, getRandomArrayElement} from '../util.js';
import {DESTINATION, TYPE} from './const.js';
import { generateDestination } from './destination.js';
import { generateOffer } from './offer.js';

const generatePoint = () => ({
  basePrice: getRandomInteger(25, 1000),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  id: '0',
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateOffer(),
  type: getRandomArrayElement(TYPE),
});

export {generatePoint};
