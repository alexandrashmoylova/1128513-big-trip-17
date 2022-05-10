import BoardPresenter from './presenter/board-presenter.js';
import {render} from './render.js';
import FilterView from './view/filter-view.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();

render(new FilterView(), siteFilterElement);
boardPresenter.init(siteEventElement);
