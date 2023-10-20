import React, { Component }  from "react";
import MButton from '../components/MButton';
import {FAKE_NOTIFIER} from '../utils/Protocol';
import RecipesManager from '../utils/RecipesManager';

/**
 * This component allows the user to confirm the deletion of a recipe. It displays the name, description, and asks for confirmation.
 *
 * @class RecipeDelete
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.recipeID - The unique identifier of the recipe to be deleted.
 * @param {function} props.onConfirm - A callback function to be called when the deletion is confirmed.
 * @param {object} [props.notifier] - An optional notifier object to handle notifications.
 *
 * @returns {JSX.Element} The RecipeDelete component for confirming the deletion of a recipe.

 *
 * @example
 * // Example usage of the RecipeDelete component
 * <RecipeDelete recipeID={recipe.id} onConfirm={handleRecipeDeletion} notifier={notifier} />
 */

class RecipeDelete extends Component{
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.recipesManager = new RecipesManager();
  }

  triggerReload = () => {
      this.recipesManager.getRecipe(this.props.recipeID)
      .then(data => this.setState({...data}))
      .catch(() => this.notifier.error("verificare la connessione"))
  }

  componentDidMount() {
    this.triggerReload();
  }

  render(){
    return (
        <div>
          <center>
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={() => this.deleteRecipe(this.state.recipeID)} />
          </center>
        </div>
    );
  }

  deleteRecipe = (id) => {
    this.recipesManager.deleteRecipe(id)
    .then(this.notifier.onRequestError("impossibile eliminare la ricetta"))
    .then(() => this.props.onConfirm(id))
}

}

export default RecipeDelete;
