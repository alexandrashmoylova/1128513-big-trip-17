import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../mock/const.js';
import {
  sortPointByPrice,
  sortPointByDay,
  sortPointByDuration,
} from '../utils/point.js';

export default class BoardPresenter {
  #pointListComponent = new ListView();
  #boardContainer = null;
  #pointModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortPointByDay);
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortPointByDuration);
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPointByPrice);
    }
    return this.#pointModel.points;
  }

  init = () => {
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleModeEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoint = () => {
    render(this.#noPointComponent, this.#boardContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      this.#pointListComponent.element,
      this.#handleViewAction,
      this.#handleModeChange
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    const pointCount = this.points.length;
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointCount = this.points.length;

    if (pointCount === 0) {
      this.#renderNoPoint();
      return;
    }
    this.#renderSort();
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints(this.points);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };
}

