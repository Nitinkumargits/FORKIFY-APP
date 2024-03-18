/**
 * this SearchView class not going to render anything  , all we want a query and listen for the event on  the button
 *
 * */

class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  //publisher---->Subscriber(controllSearchResult())
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); //handler function should be the controllSearchResult() function
    });
  }
}

/**export the instance/object  created by this class */
export default new SearchView();
