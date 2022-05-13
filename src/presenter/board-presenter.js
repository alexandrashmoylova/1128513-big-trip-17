import ListView from '../view/list-view';
import FormCreateView from '../view/form-create-view';
import FormEditView from '../view/form-edit-view';
import SortView from '../view/sort-view';
import WaypointView from '../view/waypoint-view';
import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  listView = new ListView();

  init = (boardContainer, pointModel) => {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoinits = [...this.pointModel.getPoints()];

    render(new SortView(), this.boardContainer);

    for (let i = 0; i < this.boardPoinits.length; i++) {
      render(new WaypointView(this.boardPoinits[i]), this.listView.getElement());
    }
    render(this.listView, this.boardContainer);
    render(new FormCreateView(), this.listView.getElement());
    render(new FormEditView(), this.listView.getElement(), RenderPosition.AFTERBEGIN);
  };
}
