import DetailComponent from './detail';
import HeaderComponent from './header';

const ITEM_SELECTOR = '.tc-glyph';
const LIST_SELECTOR = '.tc-list';
const UPPERHANDLER_SELECTOR = '.tc-content__upper-handler';
const SELECTED_CLASS = 'is-selected';
const SCROLLED_CLASS = 'is-scrolled';
const NAME_ATTRIBUTE = 'data-name';
const CLASS_ATTRIBUTE = 'data-class';

function parseHash(hash) {
  return hash ? hash.match(/([^#]+)$/g)[0] : '';
}

function throttle(callback, limit = 0) {
  let wait = false;
  return (...args) => {
    if (!wait) {
      callback.call(this, ...args);
      wait = true;
      setTimeout(() => { wait = false; }, limit);
    }
  };
}

function debounce(callback, wait, immediate) {
  let timeout;
  return (...args) => {
    const context = this;

    function later() {
      timeout = null;
      if (!immediate) {
        callback.apply(context, args);
      }
    }

    const run = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (run) {
      callback.apply(context, args);
    }
  };
}

export default class PreviewComponent {

  constructor(detailComponent, menuComponent) {
    this.detailComponent = detailComponent;
    this.headerComponent = menuComponent;
    this.lists = document.querySelectorAll(LIST_SELECTOR);
    this.bind();

    this.headerComponent.select(parseHash(window.location.hash));
  }

  bind() {
    document.addEventListener('click', (event) => {
      const item = this.getItem(event.target);
      if (item) {
        this.select(item);
      }
    });

    document.querySelector(UPPERHANDLER_SELECTOR).addEventListener('click', () => {
      document.scrollingElement.scrollTop = 0;
    });

    window.addEventListener('hashchange', ({ newURL }) => this.headerComponent.select(parseHash(newURL)));
    window.addEventListener('scroll', throttle(event => this.onScroll(event), 200));
    window.addEventListener('scroll', debounce(event => this.onScroll(event), 200));
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
      this.instance = new PreviewComponent(
        DetailComponent.getInstance(),
        HeaderComponent.getInstance());
    }
    return this.instance;
  }

  onScroll(event) {
    const scrollTop = event.target.scrollingElement.scrollTop;

    if (scrollTop > 200) {
      document.body.classList.add(SCROLLED_CLASS);
    } else {
      document.body.classList.remove(SCROLLED_CLASS);
    }

    const current = Array.from(this.lists)
      .filter(({ offsetTop }) => offsetTop - scrollTop < 1)
      .reverse()[0] || this.lists[0];
    const group = current.getAttribute('id');

    this.headerComponent.select(group);
    window.history.pushState({}, '', `#${group}`);
  }
}


