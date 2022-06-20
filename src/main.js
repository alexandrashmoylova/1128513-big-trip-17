
import PointModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(
  siteEventElement,
  pointModel,
  filterModel
);
const filterPresenter = new FilterPresenter(
  siteFilterElement,
  filterModel,
  pointModel
);
const newPointButtonComponent = new NewEventButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteTripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


boardPresenter.init();
filterPresenter.init();
