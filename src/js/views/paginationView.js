import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  /**
      Publisher(listen for the event)i.e addHandlerClick() which recive a handler() function->(in our case is the controllPagination inside the controller.js) with this we able to listen for the event here in View, and at the same time handle the event from the controller,
      here we gonna use eventDelegation bcz theres going to Two buttons and we don't want to listen each of  them indivially ,instead we add event listern to common parent element(this._parentElement)
  */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      ///////dataset.goto
      const goToPage = Number(btn.dataset.goto);
      // go to controller.js-->controllPagination()
      handler(goToPage);
    });
  }
  /**
   _generateMarkup() :that is the method, render()--(present in view.js) method is going to call in order to    genrate  markup for the view we are working on it,every view we are render something to UI
   */
  _generateMarkup() {
    const currentPage = this._data.page;
    /**
      //(this._data is the entire Search result object)
      In order to figure out we are on page-1 and on other pages, we need to know how many pages there are.
      60 result/10 result per page= 6 pages
     */
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    //page 1,and there are other pages
    if (currentPage == 1 && numPage > 1) {
      return `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
          </button>
      `;
    }
    //last page
    if (currentPage === numPage && numPage > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
              <span>Page ${currentPage - 1}</span>
          </button>

        
      `;
    }
    //other pages
    if (currentPage < numPage) {
      return `
            <button data-goto="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
    //page 1 and there are NO other pages
    return '';
  }
}

export default new PaginationView();

/**
 we need  a way of knowing, which is the page we need to go now, but how would JavaScript know that it should now actually display it result of paticular page, we need to establish connetion b/w the DOM and code -> we can do that
 with help of custom data-attribute,

 * create a data-attribute to each of the buttons, which will contains pages we want to go to then in our code we can read that data make  our application go to that page
 */
