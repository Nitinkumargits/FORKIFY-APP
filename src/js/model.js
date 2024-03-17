import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';

/*this big state object which contain the recipe,into which the controller will then grab and take the recipe out of there, this going to work bcz there is the live connection btw the import and export */
export const state = {
  recipe: {},
};

/*this function is responsible for fecting data from the Forkify API, 
 loadRecipe()-function not return any thing ,all it will do
 is to change our state object*/
/**
 *here the loadRecipe will not return anything ,therefore we are  not storing any result in new variable
 instead we get the access the state.recipe
 */

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
  } catch (err) {
    console.error(`${err} 🔥🔥🔥`);
  }
};
