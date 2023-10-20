import React, {Component} from 'react';
import ShoppingManager from '../utils/ShoppingManager';
import RecipeIngredientTableReadOnly from './RecipeIngredientTableReadOnly';

/**
 * The ShoppingList component retrieves a list of missing ingredients for a recipe and displays them.
 *
 * @class ShoppingList
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.recipeID - The ID of the recipe for which to retrieve the missing ingredients.
 * @param {number} props.quantity - The quantity of the recipe to consider when finding missing ingredients.
 *
 * @returns {JSX.Element} The ShoppingList component.
 *
 * @example
 * // Example usage of the ShoppingList component
 * <ShoppingList recipeID="123" quantity={5} />
 */

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: [],
      newBeerQuantity: props.quantity,
      recipeID: props.recipeID,
    };
    this.shoppingManager = new ShoppingManager();
  }

  componentDidMount() {
    this.shoppingManager.getShoppingList({
      recipeID: this.state.recipeID,
      quantity: this.state.newBeerQuantity,
    })
        .then((response) => response.json())
        .then((data) => this.setState({missingIngredients: data}))
        .catch((err) => {}); // TODO: link notifier
  }


  render() {
    return (
      <div>
        <center>
          <h2>Ingredienti Mancanti</h2>
          <RecipeIngredientTableReadOnly
            ingredients={this.state.missingIngredients}/>
        </center>
      </div>
    );
  }
}
export default ShoppingList;
