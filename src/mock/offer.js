import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {TYPE, OFFERSTITLE} from './const.js';

const generateOfferOptions = () => {
  const offer =  {
    id: getRandomInteger(1, 5),
    title: getRandomArrayElement(OFFERSTITLE),
    price: getRandomInteger(0, 140),
  };
  return offer;
};

const generateOfferQuantity = (offersCount) => Array.from({length:(offersCount)}, generateOfferOptions);

const generateOffer = () => ({
  type: getRandomArrayElement(TYPE),
  offers: generateOfferQuantity(5),
});

export {generateOffer};
