import React, { Component } from "react";
import {SHOPPING_ENDPOINT} from '../utils/Protocol';
import RecipeIngredientTableReadOnly from "./RecipeIngredientTableReadOnly";

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
  }

  componentDidMount() {
    fetch(SHOPPING_ENDPOINT + `${this.state.recipeID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: this.state.newBeerQuantity,
      }),
      }).then((response) => response.json())
      .then((data) => this.setState({ missingIngredients: data }));
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
