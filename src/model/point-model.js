import { generatePoint } from '../mock/point.js';

export default class PointModel {
  #points = Array.from({ length: 0 }, generatePoint);

  get points() {
    return this.#points;
  }
}
