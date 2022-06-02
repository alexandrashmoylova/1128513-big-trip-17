import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../mock/const.js';
import {
  sortPointByPrice,
  sortPointByDay,
  sortPointByDuration,
} from '../utils/point.js';

export default class BoardPresenter {
  #pointListComponent = new ListView();
  #boardContainer = null;
  #pointModel = null;
  #boardPoints = [];
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];
    this.#renderPointList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardPoints
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointByDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointByDuration);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointByPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardPoints исходный массив
        this.#boardPoints = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(new SortView(), this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoint = () => {
    render(new NoPointView(), this.#boardContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      this.#pointListComponent.element,
      this.#handlePointChange,
      this.#handleModeChange
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoint();
      return;
    }
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderSort();
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };
}
