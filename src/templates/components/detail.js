const ESC = 27;

export default class DetailComponent {
  constructor() {
    this.element = document.querySelector('.tc-detail');
    this.title = this.element.querySelector('.tc-detail__title');
    this.example = this.element.querySelector('.tc-detail__example');
    this.closeHandler = this.element.querySelector('.tc-detail__close-handler button');
    this.bind();
  }
  bind() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === ESC) {
        this.close();
      }
    });

    this.closeHandler
      .addEventListener('click', () => this.close());

    this.element.querySelector('.tc-detail__cloak')
      .addEventListener('click', () => this.close());
  }

  open({
    name,
    font,
  }) {
    Promise.resolve()
      .then(() => {
        this.title.innerHTML = `<i class="${font} tc-icon">${name}</i> ${name}`;
        this.example.innerText = `<i class="${font}">${name}</i>`;
        this.element.classList.add('is-open');
      });
  }

  close() {
    Promise.resolve()
      .then(() => this.element.classList.remove('is-open'));
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DetailComponent();
    }
    return this.instance;
  }
}
