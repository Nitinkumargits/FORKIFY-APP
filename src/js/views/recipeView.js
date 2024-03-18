import icons from 'url:../../img/icons.svg';
import View from './view.js';
import { Fraction } from 'fractional'; //package we import from nmp, we didn't need to mention the location/path

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _message = '';
  _errorMessage = 'We could not find the recipe. Please try another one';

  addHandlerRecipe(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  //_generateMarkup must be unique to every single view
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>

     <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
       ${this._data.ingredients.map(this._generateMarkupIngridents).join('')}
           </ul>
         </div>

     <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           this._data.publisher
         }</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href="${this._data.sourceUrl}"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
     </div>
  `;
  }

  _generateMarkupIngridents(ing) {
    return `
           <li class="recipe__ingredient">
             <svg class="recipe__icon">
               <use href="${icons}#icon-check"></use>
             </svg>
             <div class="recipe__quantity">${
               ing.quantity ? new Fraction(ing.quantity).toString() : ''
             }</div>
             <div class="recipe__description">
               <span class="recipe__unit">${ing.unit}</span>
               ${ing.description}
                  </div>
           </li>
     `;
  }
  /**publisher :basically need to get access to subscriber(in this cases is the handler function)
  - it need to part of public api  SO that we can call it in controller
  */
}

/**create the object here and export the object so that no one frome the outside class have access anything expect from the object,
 * we don't pass data inside RecipView() so we don't have constructor here
 *
 */
export default new RecipeView();
