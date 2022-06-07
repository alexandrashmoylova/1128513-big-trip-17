import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPE, DESTINATION } from '../mock/const.js';
import { humanizePointEditDueTime } from '../utils/point.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
  type: '',
};

const createOffersTypeTemplate = (offerTypes) => (
  offerTypes
    .map(
      (offerType) =>
        `<div class="event__type-item">
  <input id="event-type-${offerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}">
  <label class="event__type-label  event__type-label--${offerType}" for="event-type-${offerType}-1">${offerType}</label>
</div>`
    ))
  .join('');


const createOfferItemTemplate = (offerItems) => (
  offerItems
    .map(
      (offerItem) =>
        `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerItem.id}" type="checkbox" name="event-offer-${offerItem.id}" checked>
  <label class="event__offer-label" for="event-offer-${offerItem.id}">
    <span class="event__offer-title">${offerItem.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerItem.price}</span>
  </label>
</div>`
    ))
  .join('');


const createDestinationList = (destinations) => destinations.map((destination) => (
  `<option value="${destination}"></option>`
)).join('');

const createDestinationPhoto = (photos) => (
  photos.map(
    (photo) =>
      `<img class="event__photo" src=${photo.src} alt="Event photo">`
  ))
  .join('');


const createFormEditTemplate = (point) => {
  const { offers, destination, basePrice, dateTo, dateFrom } = point;

  // const offersListType = offers.find((offer) => ((offer.type === type))).offers;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${createOffersTypeTemplate(TYPE)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${offers.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  destination.name
}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${createDestinationList(DESTINATION)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointEditDueTime(
    dateFrom
  )}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointEditDueTime(
    dateTo
  )}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOfferItemTemplate(offers.offers)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createDestinationPhoto(destination.pictures)}
        </div>
        </div>
      </section>
      </section>
    </form>
  </li>`;
};

export default class FormEditView extends AbstractStatefulView {
  #point = null;
  constructor(point = BLANK_POINT) {
    super();
    this._state = FormEditView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.FormEditView.parsePointToState(this._state));
  };

  #pointTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #pointDestinationTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationTypeHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
    destination: point.destination,
    offers: point.offers,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    return point;
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
