import DetailComponent from './detail';

const ITEM_SELECTOR = '.tc-glyph';
const LIST_SELECTOR = '.tc-list';
const SELECTED_CLASS = 'is-selected';
const NAME_ATTRIBUTE = 'data-name';
const CLASS_ATTRIBUTE = 'data-class';

export default class PreviewComponent {

  constructor(detailComponent) {
    this.detailComponent = detailComponent;
    this.lists = document.querySelectorAll(LIST_SELECTOR);
    this.bind();
  }

  bind() {
    document.addEventListener('click', (event) => {
      const item = this.getItem(event.target);
      if (item) {
        this.select(item);
      }
    });
  }

  select(item) {
    PreviewComponent.unselectAll()
      .then(() => {
        item.classList.add(SELECTED_CLASS);
        const name = item.getAttribute(NAME_ATTRIBUTE);
        const font = item.getAttribute(CLASS_ATTRIBUTE);
        this.detailComponent.open({
          name,
          font,
        });
      });
  }

  static unselectAll() {
    return Promise.resolve()
      .then(() => {
        Array.from(document.querySelectorAll(`${ITEM_SELECTOR}.${SELECTED_CLASS}`))
          .forEach(item => item.classList.remove(SELECTED_CLASS));
      });
  }

  getItem(child) {
    if (child.matches(ITEM_SELECTOR)) {
      return child;
    }
    if (child.matches(LIST_SELECTOR) || child === document.body) {
      return null;
    }
    return this.getItem(child.parentNode);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PreviewComponent(DetailComponent.getInstance());
    }
    return this.instance;
  }
}
