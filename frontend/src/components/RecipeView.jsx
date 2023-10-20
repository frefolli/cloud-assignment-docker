import React from "react";
import { FAKE_NOTIFIER } from '../utils/Protocol';
import RecipeIngredientTableReadOnly from "./RecipeIngredientTableReadOnly";
import RecipesManager from '../utils/RecipesManager';

/**
 * The RecipeView component displays detailed information about a specific recipe, including its name, description, and ingredients in read-only mode.
 *
 * @class RecipeView
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.recipeID - The unique identifier of the recipe to display.
 * @param {Object} [props.notifier=FAKE_NOTIFIER] - The notifier object used for displaying notifications. Defaults to FAKE_NOTIFIER if not provided.
 *
 * @returns {JSX.Element} The RecipeView component.
 *
 * @example
 * // Example usage of the RecipeView component
 * <RecipeView recipeID={selectedRecipeID} notifier={notifierInstance} />
 */

export default class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.recipesManager = new RecipesManager();
  }

  triggerReload = () => {
      this.recipesManager.getRecipe(this.props.recipeID)
      .then(data => this.setState({...data}))
      .catch(this.notifier.connectionError)
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    return (
      <div>
        <center>
          <h1> {this.state.name}</h1>
          <p> {this.state.description} </p>
          <RecipeIngredientTableReadOnly
            ingredients={this.state.ingredients}/>
        </center>
      </div>
    );
  }
};

