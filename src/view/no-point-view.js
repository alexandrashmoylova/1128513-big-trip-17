import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/const.js';

const noPointTextType = {
  [FilterType.EVERYTHING]: 'Click «NEW EVENT» to create your first event',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoPointTemplate = (filterType) => {
  const noPointTextValue = noPointTextType[filterType];
  return (
    `<p class="trip-events__msg">
    ${noPointTextValue}
    </p>`
  );
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
