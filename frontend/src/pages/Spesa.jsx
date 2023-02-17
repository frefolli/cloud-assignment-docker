import React, { Component } from "react";
import MButton from "../components/MButton";
import {DO_SHOPPING_ENDPOINT, FAKE_NOTIFIER, isNotValidPositiveQuantity} from '../utils/Protocol';
import BodyThemeManager from '../components/BodyThemeManager';
import IngredientNameInput from "../components/IngredientNameInput";
import QuantityInput from "../components/QuantityInput";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Tooltip } from "@mui/material";

class Spesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: 0,
      ingredients: [
        {
          ingredientName: "",
          ingredientQuantity: "0",
        },
      ],
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  handleSubmit = () => {
    const _ingredients = [];
    for (const ingredient of this.state.ingredients) {
      const { ingredientName, ingredientQuantity } = ingredient;
      if (
        ingredientName &&
        ingredientQuantity &&
        this.state.ingredients.indexOf(ingredient) < this.state.added
      ) {
        if (isNotValidPositiveQuantity(ingredientQuantity))
          return this.notifier.warning("le quantita' dei singoli ingredienti devono essere strettamente positive");
        _ingredients.push({
          name: ingredientName,
          quantity: ingredientQuantity,
        });
      }
    }
    if (_ingredients.length !== 0) {
      fetch(DO_SHOPPING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_ingredients),
      })
      .then(this.notifier.onRequestSuccess("ingredienti inventariati con successo"))
      .then(this.notifier.onRequestError("impossibile inventariare gli ingredienti"))
      .then(() => {
        this.setState({
          ingredients: [{ ingredientName: "", ingredientQuantity: "0" }],
        });
      });
    }
  }

  handleDeleteIngredient = (index) => {
    this.setState({
      added: this.state.added - 1,
      ingredients: this.state.ingredients.filter((p, i) => i !== index),
    });
  }

  handleAddIngredient = () => {
    const { ingredientName: newIngName, ingredientQuantity: newIngQuantity } = this.state.ingredients[this.state.ingredients.length - 1];
    const ingredients = this.state.ingredients;
    const isAlreadyAdded = ingredients.find((ingredient) => ingredient.ingredientName === newIngName);
    if (
      isAlreadyAdded &&
      ingredients.indexOf(isAlreadyAdded) !== ingredients.length - 1
    ) {
      const previouslyAddedIngedient = ingredients[ingredients.indexOf(isAlreadyAdded)];
      previouslyAddedIngedient.ingredientQuantity = (parseFloat(previouslyAddedIngedient.ingredientQuantity) + parseFloat(newIngQuantity)).toString();
      ingredients[ingredients.length - 1] = { ingredientName: '', ingredientQuantity: '' };
    } else {
      ingredients[ingredients.length - 1] = {
        ingredientName: newIngName,
        ingredientQuantity: newIngQuantity,
      };
      if (newIngName !== "") {
          ingredients.push({ ingredientName: "", ingredientQuantity: "0" })
          this.setState({ ingredients, added: this.state.added + 1 });
      } else {
        return this.notifier.warning("il nome dell'ingrediente non deve essere vuoto")
      }
    }
  }

  handleIngredientChange = (field, index, value) => {
    const ingredients = this.state.ingredients;
    ingredients[index][field] = value;
    this.setState({ ingredients });
  }

  render() {
    return (
      <BodyThemeManager>
        <table className="myTable">
          <thead>
            <tr>
              <th>Nome ingrediente</th>
              <th>Quantità</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredients.map((ingredient, index) => {
              let firstColumn = (
                <IngredientNameInput
                  value={ingredient.ingredientName}
                  onChange={(e) =>
                    this.handleIngredientChange(
                      "ingredientName",
                      index,
                      e.target.value
                    )
                  }
                />
              );
              let button = (
                <Tooltip title="Aggiungi">
                  <IconButton aria-label="Aggiungi" onClick={this.handleAddIngredient}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              );
              if (index !== this.state.ingredients.length - 1) {
                button = (
                  <Tooltip title="Elimina">
                    <IconButton aria-label="Elimina" onClick={() => this.handleDeleteIngredient(index)}>
                      <RemoveShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                );
                firstColumn = <p>{ingredient.ingredientName}</p>;
              }
              return (
                <tr
                  key={
                    this.state.ingredients.length - 1 === index
                      ? "default"
                      : ingredient.ingredientName
                  }
                >
                  <td>{firstColumn}</td>
                  <td>
                    <QuantityInput
                      label="Quantity"
                      value={ingredient.ingredientQuantity}
                      onChange={(e) =>
                        this.handleIngredientChange(
                          "ingredientQuantity",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>{button}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="shoppingButtonContainer">
          <MButton startIcon={<ShoppingCartCheckoutIcon/>} text="Conferma" onClick={this.handleSubmit}/>
        </div>
      </BodyThemeManager>
    );
  }
}

export default Spesa;