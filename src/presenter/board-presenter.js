import ListView from '../view/list-view.js';
// import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';
import WaypointView from '../view/waypoint-view.js';
import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  listView = new ListView();

  init = (boardContainer, pointModel) => {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.boardPoints = [...this.pointModel.getPoints()];

    render(new SortView(), this.boardContainer);

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new WaypointView(this.boardPoints[i]), this.listView.getElement());
    }
    render(this.listView, this.boardContainer);
    // render(new FormCreateView(), this.listView.getElement());
    render(new FormEditView(this.boardPoints[0]), this.listView.getElement(), RenderPosition.AFTERBEGIN);
  };
}
