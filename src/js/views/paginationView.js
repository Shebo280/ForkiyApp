import View from './view';
import icons from 'url:../../img/icons.svg'; // Parcel 2
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      //checking if the clicked is span or the svg image , or if the clicked is the button
      if (
        e.target.parentElement.parentElement.classList.contains('next') ||
        e.target.parentElement.classList.contains('next')
      )
        handler('next');
      else if (
        e.target.parentElement.parentElement.classList.contains('prev') ||
        e.target.parentElement.classList.contains('prev')
      )
        handler('prev');
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    //Page 1 and there are NO other pages
    if (numPages === 1) {
      return ``;
    }
    //Page 1 and there are  other pages
    else if (curPage === 1) {
      return `${this.addingNextButton()}`;
    }
    //Last Page
    else if (curPage === numPages && curPage > 1) {
      return `${this.addingPrevButton()}`;
    }

    //Some other page
    else {
      return `${this.addingPrevButton()} ${this.addingNextButton()}`;
    }
  }
  addingPrevButton() {
    return `
    <div class="prev">
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>
  </div>`;
  }
  addingNextButton() {
    return `
    <div class="next">
    <button class="btn--inline pagination__btn--next">
    <span>Page ${this._data.page + 1}</span>
    <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>
    </div>`;
  }
}
export default new PaginationView();
