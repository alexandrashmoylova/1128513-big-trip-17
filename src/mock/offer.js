import {getRandomInteger, getRandomArrayElement} from '../util.js';
import {TYPE, OFFERSTITLE} from './const.js';

const generateOffer = () => ({
  type: getRandomArrayElement(TYPE),
  offers: [
    {
      id: 1,
      title: getRandomArrayElement(OFFERSTITLE),
      price: getRandomInteger(0, 140),
    },
    {
      id: 2,
      title: getRandomArrayElement(OFFERSTITLE),
      price: getRandomInteger(0, 90),
    },
    {
      id: 3,
      title: getRandomArrayElement(OFFERSTITLE),
      price: getRandomInteger(0, 100),
    },
  ]
});

export {generateOffer};
