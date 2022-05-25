import ListView from '../view/list-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';
import WaypointView from '../view/waypoint-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #pointListComponent = new ListView();
  #boardContainer = null;
  #pointModel = null;
  #boardPoints= [];

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];
    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#boardContainer);
    } else {
      this.#renderBoard();
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new WaypointView(point);
    const pointEditComponent = new FormEditView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointListComponent.element);
  };

  #renderBoard = () => {
    render(new SortView(), this.#boardContainer);
    render(this.#pointListComponent, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };
}
