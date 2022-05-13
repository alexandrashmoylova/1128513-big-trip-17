import {getRandomInteger, getRandomArrayElement} from '../util.js';
import {TYPE} from './const.js';

const generateOffer = () => ({
  type: getRandomArrayElement(TYPE),
  offer: [
    {
      id: 1,
      title: 'Choose the radio station',
      price: getRandomInteger(0, 140),
    },
    {
      id: 2,
      title: 'Upgrade to a business class',
      price: getRandomInteger(0, 90),
    },
    {
      id: 3,
      title: 'Comfortable seats',
      price: getRandomInteger(0, 100),
    },
  ]
});

export {generateOffer};
