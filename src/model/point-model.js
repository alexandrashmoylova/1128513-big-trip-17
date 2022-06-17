import { generatePoint } from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class PointModel {
  #points = Array.from({ length: 6 }, generatePoint);

  get points() {
    return this.#points;
  }
}
