import ListView from '../view/list-view';
import FormCreateView from '../view/form-create-view';
import FormEditView from '../view/form-edit-view';
import SortView from '../view/sort-view';
import WaypointView from '../view/waypoint-view';
import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  listView = new ListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.listView.getElement());
    }
    render(this.listView, this.boardContainer);
    render(new FormCreateView(), this.listView.getElement());
    render(new FormEditView(), this.listView.getElement(), RenderPosition.AFTERBEGIN);
  };
}
