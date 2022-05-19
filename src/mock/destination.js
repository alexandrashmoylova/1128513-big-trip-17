import {getRandomInteger, getRandomArrayElement} from '../util.js';
import {DESTINATION, DESCRIPTION, PICS_QUATITY} from './const.js';

const generateDestination = () => ({
  description: getRandomArrayElement(DESCRIPTION),
  name: getRandomArrayElement(DESTINATION),
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${getRandomInteger(0, PICS_QUATITY)}`,
      description: getRandomArrayElement(DESCRIPTION),
    }
  ]
});

export {generateDestination};
