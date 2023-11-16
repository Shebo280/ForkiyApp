import View from './view';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `Unfortunately, No recipes found for your qurey!`;
  _message = '';
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new ResultsView();
