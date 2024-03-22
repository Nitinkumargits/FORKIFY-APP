import icons from 'url:../../img/icons.svg';

/**parent class for other child View(search and result) */
/**with parcel and babel - inheritance b/w the private fields and method doesn't really work ,
 * we have to use the native way of javaScript
 */

export default class View {
  _data;

  /**will get the data  */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    /**
     create new markup but not Render it, all we gonna do is to genrate this markup and then compare that new html and current html and only change text and attributes that actually have change from old version to new version
     */
    const newMarkup = this._generateMarkup();

    /**
      convert this _generateMarkup which is a string to DOM-Node object that live in the memory and we compare with the actuall DOM that's on the page, newDOM- here bcm big object which is like virtual DOM, DOM thats not really lives on the page buts lives in memory, then we can use the dom as if its was on our page
     
     */
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newElement.forEach((newEl, i) => {
      //curEl is the actuall element that currently on the page, that is the one we wanna update
      const curEl = currentElement[i];
      /**
       -> isEqualNode() will compare the content of node
       -> the value of nodeValue() will be null for most of the value expect if node is text, then we  get the content of text-node
       */
      //update change TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update change Attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
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
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
