import React, { Component } from "react";
import { FAKE_NOTIFIER, isNotValidPositiveQuantity } from '../utils/Protocol';
import RecipesManager from '../utils/RecipesManager';
import InputFieldSetting from "./InputFieldSetting";
import InputTextAreaSetting from "./InputTextAreaSetting";
import JimFlex from "./JimFlex";
import RecipeIngredientTable from "./RecipeIngredientTable";

/**
 * This component allows editing a recipe. It displays the recipe name, description, ingredients, and provides options to edit or add ingredients.
 *
 * @class RecipeEdit
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.recipeID - The unique identifier of the recipe to be edited.
 * @param {function} props.onConfirm - A callback function to be called when the editing is confirmed.
 * @param {object} [props.notifier] - An optional notifier object to handle notifications.
 *
 * @returns {JSX.Element} The RecipeEdit component for editing a recipe.
 *
 * @example
 * // Example usage of the RecipeEdit component
 * <RecipeEdit recipeID={recipe.id} onConfirm={handleRecipeEditing} notifier={notifier} />
 */

class RecipeEdit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newIngredientName: "", newIngredientQuantity: "0",
      name: "", description: "", ingredients: []
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.recipesManager = new RecipesManager(this.props.recipeID)
  }

  triggerReload = () => {
      this.recipesManager.getRecipe(this.props.recipeID)
      .then(data => this.setState({newIngredientName: "", newIngredientQuantity: "0", ...data}))
      .catch(this.notifier.connectionError)
  }

  componentDidMount() {
    this.triggerReload();
  }

  setQuantity = (id, event) => {
    let quantity = event.target.value;
    this.setState({ingredients:     
      this.state.ingredients.map( item => {
        if(item.ingredientID === id){
          item.quantity=quantity;
        }
        return item;
      })
    })
  }

  setName = (event) => {
    let newNameRecipe = event.target.value;
    this.setState({name: newNameRecipe})
  }

  setDescription = (event) => {
    let newDescription = event.target.value;
    this.setState({description: newDescription})
  }

  setNewIngredientName = (event) => {
    let newName = event.target.value;
    this.setState({newIngredientName: newName});
  }

  setNewIngredientQuantity = (event) => {
    let newQuantity = event.target.value;
    this.setState({newIngredientQuantity: newQuantity});
  }

  render(){  
    return (
        <center>
          <JimFlex>
              <InputFieldSetting
                label="Recipe Name"
                value={this.state.name}
                title="Nome"
                onChange={this.setName}
                onConfirm={() => this.editName()}
              />
              <InputTextAreaSetting
                label="Recipe Description"
                value={this.state.description}
                title="Descrizione"
                onChange={this.setDescription}
                onConfirm={() => this.editDescription()}
              />
          </JimFlex>
            
          <RecipeIngredientTable
            ingredients={this.state.ingredients}
            editQuantity={this.editQuantity}
            setQuantity={this.setQuantity}
            deleteIngredient={this.deleteIngredient}
            newIngredientName={this.state.newIngredientName}
            setNewIngredientName={this.setNewIngredientName}
            newIngredientQuantity={this.state.newIngredientQuantity}
            setNewIngredientQuantity={this.setNewIngredientQuantity}
            addIngredient={this.addIngredient}
          />
        </center>
    );
  }

  deleteIngredient = (id) => {
    this.recipesManager.deleteIngredient(this.state.recipeID, id)
    .then(() => {
      this.triggerReload();
    })
    .catch(() => this.notifier.error("impossibile eliminare l'ingrediente"));
  }

  editQuantity = (id) => {
    let newQuantity = [...this.state.ingredients].filter(i => i.ingredientID === id)[0].quantity;
    if (isNotValidPositiveQuantity(newQuantity))
      return this.notifier.warning("la quantita' degli ingredienti deve essere strettamente positiva");
    this.recipesManager.putIngredient(this.state.recipeID, id, {quantity: newQuantity})
    .then(() => this.notifier.success("quantita' aggiornata correttamente'"))
    .then(() => {
      this.triggerReload();
    })
    .catch(() => this.notifier.error("impossibile modificare la quantita'"));
  }

  editName = () => {
    if (this.state.name === "")
      return this.notifier.warning("il nome della ricetta non deve essere vuoto");
    this.recipesManager.putRecipe(this.state.recipeID, {name: this.state.name})
    .then(() => this.notifier.success("nome modificato correttamente"))
    .then(() => {
      this.props.onConfirm();
      this.triggerReload();
    })
    .catch(() => this.notifier.error("impossibile modificare il nome"));
  }

  editDescription = () => {
    this.recipesManager.putRecipe(this.state.recipeID, {description: this.state.description})
    .then(() => this.notifier.success("descrizione modificata correttamente"))
    .then(() => {
      this.props.onConfirm();
      this.triggerReload();
    })
    .catch(() => this.notifier.error("impossibile modificare la descrizione"));
  }

  addIngredient = () => {
    if (this.state.newIngredientName === "")
      return this.notifier.warning("il nome dell'ingrediente non deve essere vuoto");
    if (this.state.ingredients.filter(item => this.state.newIngredientName === item.name).length !== 0)
      return this.notifier.warning("i nomi degli ingredienti devono essere distinti");
    if (isNotValidPositiveQuantity(this.state.newIngredientQuantity))
      return this.notifier.warning("la quantita' degli ingredienti deve essere strettamente positiva");
    this.recipesManager.postIngredient(this.state.recipeID, {
        name: this.state.newIngredientName,
        quantity: this.state.newIngredientQuantity
    })
    .then(() => this.notifier.success("ingrediente aggiunto correttamente"))
    .then(() => {
      this.triggerReload();
    })
    .catch(this.notifier.onRequestError("impossibile aggiungere l'ingrediente"));
  }
}

export default RecipeEdit;
