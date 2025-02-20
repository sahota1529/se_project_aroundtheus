export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;

    if (typeof containerSelector === "string") {
      this._container = document.querySelector(containerSelector);
    } else {
      this._container = containerSelector;
    }
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, placement = "prepend") {
    if (placement === "append") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  setItems(items) {
    this._renderItems = items;
  }
}
