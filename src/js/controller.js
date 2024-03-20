import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from '../js/views/paginationView.js';

///////////////////////////////////////
/**the keep up the state from page,activate the hot module reloadiing,(Not real JavaScript) it come from parcel */
// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async function () {
  try {
    //getting hash from URL
    const id = window.location.hash.slice(1);
    //Guard clause
    if (!id) return;
    recipeView.renderSpinner();
    //1. load Recipe
    /*
     this loadRecipe funtion is async funtion this return a promise ,here we have to avoid the promise
     (this is the situation that one async function return a another async function), an aysnc function return a promise we need to handle when ever we call the async function
     */
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
    console.log(`${err} 🔥🔥🔥`);
    //catch the error from thrown by loadRecipe() which is present in (model.js),now we can render UI
    // recipeView.renderError(`${err} 🔥🔥🔥`);
  }
};
/**
 * this function will call the async loadSearchResult()-(this function will also not return anything,all it does is manipulate the state)
 */
const controllSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //1. Get search query
    const query = searchView.getQuery();
    //Guard clause
    if (!query) return;
    //2. load search result
    await model.loadSearchResult(query);
    //3. render result
    // console.log(model.state.search.result);
    // resultView.render(model.state.search.result);//all result
    //Now we want some result
    resultView.render(model.getSearchResultsPage());
    //4.initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controllPagination = function (goToPage) {
  // console.log(goToPage);
  //1. render new result
  // resultView.render(model.state.search.result);//all result
  //Now we want some result
  resultView.render(model.getSearchResultsPage(goToPage));
  //2.initial new pagination button
  paginationView.render(model.state.search);
};
/**
 * if you run this there will be no result,bcz nothing will be found on the Search-IN-UI ,In order to make this work now we need to listen for the event,clicking this button on search field  or submitting this form, on that event we call the  controllSearchResult() function,not in begining when the script loads */
/** In order to do that we use the Publisher-subscriber pattern
 * listen an event form the view(searchView.js) and pass the controller function so the handler function into the method that we build here
 * //publisher-->addHandlerSearch(searchView.js)
 * //Subscriber-->controllSearchResult()
 */

const init = function () {
  //Subscriber
  recipeView.addHandlerRecipe(controllRecipes);
  searchView.addHandlerSearch(controllSearchResult);
  paginationView.addHandlerClick(controllPagination);
};

init();
