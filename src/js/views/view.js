import icons from 'url:../../img/icons.svg'; // Parcel 2
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEL, i) => {
      let curEL = curElements[i];
      //Updates changing TEXT
      if (
        !newEL.isEqualNode(curEL) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      )
        curEL.textContent = newEL.textContent;
      //Updates chaning Data Attributes
      if (!newEL.isEqualNode(curEL)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEL.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  renderSpinner() {
    const markup = `
          <div class="spinner">
          <svg>
          <use href="${icons}#icon-loader"></use>
          </svg>
          </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
              <div>
              <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._errorMessage) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
}
