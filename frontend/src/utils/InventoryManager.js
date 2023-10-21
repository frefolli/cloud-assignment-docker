import {INVENTORY_ENDPOINT} from './Protocol';

export default class InventoryManager {
  getIngredientList(search) {
    return new Promise((acc, rej) => {
      fetch(INVENTORY_ENDPOINT)
          .then((response) => response.json())
          .then(acc).catch(rej);
    });
  }

  deleteIngredient(ingredientID) {
    return new Promise((acc, rej) => {
      fetch(INVENTORY_ENDPOINT + `/${ingredientID}`, {method: 'DELETE'})
          .then(acc).catch(rej);
    });
  }
}
