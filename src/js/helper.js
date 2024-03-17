/**Goal of this file/module to contain helper function that we can Reuse in our Project  */

import { TIMEOUT_SEC } from './config';
/**setting timeout if the request fail , important to prevent the really bad internet connection this fectch may run forever
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // 1. Loading recipe

    const fetchPromis = fetch(url);
    const res = await Promise.race([fetchPromis, timeout(TIMEOUT_SEC)]);
    //res return a promise
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //this data bcm the resolve value of the promise
  } catch (err) {
    /**Error will happen here , but we want to handle in loadRecipe(model.js), So we have to reThrow the error object ,from this the promise form getJSON will reject*/
    throw err;
  }
};
