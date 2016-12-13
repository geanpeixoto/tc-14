const SELECTED_CLASS = 'is-selected';
const OPEN_CLASS = 'is-open';
const CLOAK_SELECTOR = '.tc-cloak';
const HEADER_SELECTOR = '.tc-header';
const HANDLER_SELECTOR = '.tc-header__menu-handler';
const ITEM_SELECTOR = '.tc-header__menu-item';
const LIST_SELECTOR = '.tc-header__menu-list';

export default class HeaderComponent {
  constructor() {
    this.element = document.querySelector(HEADER_SELECTOR);
    this.bind();
  }

  bind() {
    this.element.querySelector(CLOAK_SELECTOR)
      .addEventListener('click', () => this.close());

    this.element.querySelector(HANDLER_SELECTOR)
      .addEventListener('click', () => this.toggle());

    this.element.addEventListener('click', (event) => {
      if (this.getItem(event.target)) {
        this.close();
      }
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

  close() {
    this.element.classList.remove(OPEN_CLASS);
  }

  open() {
    this.element.classList.add(OPEN_CLASS);
  }

  isOpen() {
    return this.element.classList.contains(OPEN_CLASS);
  }

  toggle() {
    return this.isOpen() ? this.close() : this.open();
  }

  select(group) {
    const old = this.element.querySelector(`a.${SELECTED_CLASS}`);

    if (old) {
      old.classList.remove(SELECTED_CLASS);
    }

    const handler = this.element.querySelector(`a[href="#${group}"]`) || this.element.querySelector('a:first-child');
    handler.classList.add(SELECTED_CLASS);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HeaderComponent();
    }
    return this.instance;
  }
}
