export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendereritems = items;
    this._renderer = renderer;
    this._class = document.querySelector(containerSelector);
  }
  renderItems() {
    this._rendereritems.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element, placement = "prepend") {
    this._class[placement](element);
  }
}
