import {SHOPPING_ENDPOINT} from './Protocol';

export default class ShoppingManager {
  getShoppingList(nextRecipe) {
    return new Promise((acc, rej) => {
      fetch(SHOPPING_ENDPOINT + `/${nextRecipe.recipeID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: nextRecipe.quantity,
        }),
      })
          .then((response) => response.json())
          .then((data) => acc(data))
          .catch((err) => rej(err));
    });
  }

  doShopping(ingredients) {
    return new Promise((acc, rej) => {
      fetch(SHOPPING_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredients),
      })
          .then((data) => acc(data))
          .catch((err) => rej(err));
    });
  }
}
