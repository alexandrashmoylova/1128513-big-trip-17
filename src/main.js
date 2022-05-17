import TripInfoView from './view/trip-info.js';
import PointModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './render.js';
import FilterView from './view/filter-view.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();
const pointModel = new PointModel();

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);
boardPresenter.init(siteEventElement, pointModel);
