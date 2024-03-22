import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';
  _errorMessage = 'No recipe find for your query. Please try again ';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
