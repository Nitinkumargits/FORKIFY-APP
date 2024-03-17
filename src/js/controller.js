import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//

const controllRecipes = async function () {
  try {
    //getting hash from URL
    const id = window.location.hash.slice(1);
    //Guard clause
    if (!id) return;
    recipeView.renderSpinner();
    //1. load Recipe
    /* this loadRecipe funtion is async funtion this return a promise ,here we have to avoid the promise
    (this is the situation that one async function return a another async function), an aysnc function return a promise we need to handle when ever we call the async function */
    await model.loadRecipe(id);

    //2. Rendering recipe
    /**
     * here we call the recipeView.render(here we pass the data),this render() will accept data then
     * store it into object (class RecipeView from recipeView)
     */
    recipeView.render(model.state.recipe);
    /**or */
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
// window.addEventListener('hashchange', controllRecipes);
// window.addEventListener('load', controllRecipes);

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controllRecipes)
);
