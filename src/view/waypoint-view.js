import {createElement} from '../render.js';
import {humanizePointDueDate, humanizePointDueTime, humanizePointDueDateYear, humanizePointDueDateYearTime, diffTimeHours, diffTimeMinutes} from '../util.js';

const createWaypointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, type, isFavorite, offers} = point;

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : 'event__favorite-btn';

  const createOfferTemplate = (pointOffers) =>
    pointOffers.map((pointOffer) =>
      `<li class="event__offer">
      <span class="event__offer-title">${pointOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${pointOffer.price}</span>
    </li>`
    ).join('');


  return (`<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${humanizePointDueDateYear(dateFrom)}">${humanizePointDueDate(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${humanizePointDueDateYearTime(dateFrom)}">${humanizePointDueTime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${humanizePointDueDateYearTime(dateTo)}">${humanizePointDueTime(dateTo)}</time>
                  </p>
                  <p class="event__duration">${diffTimeHours(dateTo, dateFrom)}H${diffTimeMinutes(dateTo, dateFrom)}M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${createOfferTemplate(offers.offers)}
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );
};


export default class WaypointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createWaypointTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
