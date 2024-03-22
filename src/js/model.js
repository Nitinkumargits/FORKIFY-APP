import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_Page } from './config.js';
import { getJSON } from './helper.js';

/**
 * this big state object which contain the recipe,into which the controller will then grab  and take the recipe out of there, this going to work bcz there is the live connection btw the  import and export
 *state contain all data we need to build our application.
 *all the data about the application also include the search query
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RESULT_PER_Page,
  },
  bookmarks: [],
};

/** 
 * this function is responsible for fecting data from the Forkify API, 
 loadRecipe()-function not return any thing ,all it will do
 is to change our state object
 *here the loadRecipe will not return anything ,therefore we are  not storing any result in new variable
 instead we get the access the state.recipe
 */

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    /** 
     as we got the loadSearchResult data and store it in state then we can check if there is the recipe with the same id  in bookmark state and if it is then we mark the current recipe that we just loaded from the API as bookmarked  set to true
    */
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(`${err} 🔥🔥🔥`);
    throw err; //to controller.js
  }
};

/**
 * create a function and export it so that it can use by the controler,since it will perform AJAX calls
 * it must be a async function,this function is called by the controller,so it the controller will tell
 * this function what to search for as we pass a query(string) to loadSearchResult function, which we can pluck into API call
 */
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    //reset the pageNumber
    state.search.page = 1;
    // console.log(state.search.result);
  } catch (err) {
    console.error(`${err} 🔥🔥🔥`);
    throw err; //to controller.js
  }
};

/**
 * not an async function bcz we already have the search result loaded
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; //0 (10 is the amt of page we want)
  const end = page * state.search.resultPerPage; //9
  return state.search.result.slice(start, end);
};
/**
 this updateServings function will do is to reach into the state(recipe ingreident) and then change the qunatity in each ingridents
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQt=oldQT * newServings/oldServings // 2 * 8/4= 4
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //Add bookMark
  state.bookmarks.push(recipe);
  //mark current recipe as the bookmarked
  if ((recipe.id = state.recipe.id)) state.recipe.bookmarked = true;
};

/** 
  common pattern when we add something we get the entire data(i.e recipe ) and when we want to delete something we only get the id
 */
export const deleteBookmark = function (id) {
  //delete Bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe as the NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
