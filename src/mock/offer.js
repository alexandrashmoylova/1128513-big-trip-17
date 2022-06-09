// import { getRandomInteger } from '../utils/common';

// import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
// import {TYPE, OFFERSTITLE} from './const.js';


// const generateOfferOptions = () => {
//   const offer =  {
//     id: getRandomInteger(1, 5),
//     title: getRandomArrayElement(OFFERSTITLE),
//     price: getRandomInteger(0, 140),
//   };
//   return offer;
// };

// const generateOfferQuantity = (offersCount) => Array.from({length:(offersCount)}, generateOfferOptions);


// const generateOffer = () => ({
//   type: getRandomArrayElement(TYPE),
//   offers: generateOfferQuantity(getRandomInteger(1, 6)),
// });

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Drive quickly, I\'m in a hurry',
        price: 110,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 40,
      },
      {
        id: 3,
        title: 'Comfortable seats',
        price: 60,
      }
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Drinks included',
        price: 140,
      },
      {
        id: 2,
        title: 'Upgrade to business class',
        price: 120,
      },
      {
        id: 3,
        title: 'Add luggage',
        price: 190,
      }
    ],
  },

  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Drinks included',
        price: 40,
      },
      {
        id: 2,
        title: 'Upgrade to business class',
        price: 80,
      },
      {
        id: 3,
        title: 'Add luggage',
        price: 130,
      }
    ],
  },
];

export {OFFERS};
