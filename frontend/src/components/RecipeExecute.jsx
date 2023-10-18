import React, { Component } from "react";
import MButton from "../components/MButton";
import { RECIPE_ENDPOINT, BEER_LIST_ENDPOINT, FAKE_NOTIFIER, isNotValidPositiveQuantity} from '../utils/Protocol';
import ShoppingList from "./ShoppingList";
import QuantityInput from "./QuantityInput";
import { TextField } from "@mui/material";
import SettingsManager from '../utils/SettingsManager';
import BirreIcon from "../svgicons/BirreIcon";

/**
 * The RecipeExecute component allows users to execute a recipe. It displays the recipe details, including name, description, ingredients, equipment, and provides options to create a new beer.
 *
 * @class RecipeExecute
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.recipeID - The unique identifier of the recipe to be executed.
 * @param {number} [props.beerQuantity=0] - The default beer quantity to create.
 * @param {function} props.onConfirm - A callback function to be called when the execution is confirmed.
 * @param {object} [props.notifier] - An optional notifier object to handle notifications.
 *
 * @returns {JSX.Element} The RecipeExecute component for executing a recipe.
 *
 * @example
 * // Example usage of the RecipeExecute component
 * <RecipeExecute recipeID={recipe.id} onConfirm={handleRecipeExecution} notifier={notifier} />
 */

class RecipeExecute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: false,
      newBeerName: "new Beer",
      newBeerQuantity: this.props.beerQuantity || 0,
      name: "",
      description: "",
      ingredients: [],
      equipment: "",
      missingEquipment: false
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.settingsManager = new SettingsManager();
  }

  triggerReload = () => {
    return new Promise((acc, rej) => {
      const recipeID = this.props.recipeID;
      fetch(RECIPE_ENDPOINT+`${recipeID}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ ...data }); acc();
        })
        .catch(() => {
          this.notifier.connectionError(); rej();
        })
    })
  }

  triggerReloadSettings = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting("equipment")
      .then(data => {
        if (data.value !== "") {
          this.setState({equipment: Number(data.value)})
          acc(data.value);
        } else rej();
      })
      .catch((err) => {
        this.notifier.connectionError()
        rej(err)
      })
    })
  }

  componentDidMount() {
    this.triggerReload()
      .then(this.triggerReloadSettings)
      .catch(() => {})
  }

  setNewBeerName = (event) => {
    let newBeerName = event.target.value;
    this.setState({ newBeerName: newBeerName });
  }

  setNewBeerQuantity = (event) => {
    this.setState({ newBeerQuantity: event.target.value });
  }

  render() {
    const action = () => {

      if (this.state.missingEquipment) {
        return (
          <div>
            <center>
              <h2>Equipaggiamento Mancante</h2>
            </center>
          </div>
        );
      }

      if (this.state.missingIngredients) {
        return (<ShoppingList notifier={this.notifier} recipeID={this.props.recipeID} quantity={this.state.newBeerQuantity}/>);
      }
    };

    return (
        <div>
          <table className="myTable">
              <tbody>
                <tr>
                  <td>Nuova Birra</td>
                  <td>
                    <TextField
                      label="Beer Name"
                      value={this.state.newBeerName}
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={this.setNewBeerName}
                    />
                  </td>
                  <td>
                    <QuantityInput
                      label="Beer Quantity"
                      value={this.state.newBeerQuantity}
                      onChange={this.setNewBeerQuantity}
                    ></QuantityInput>
                  </td>
                  <td>
                    <MButton startIcon={<BirreIcon/>} text="Crea" onClick={this.addBeer} />
                  </td>
                </tr>
              </tbody>
            </table>
          {action()}
        </div>
    );
  }

  addBeer = () => {
    this.setState({
      missingEquipment: false,
      missingIngredients: false
    }, () => {
      if (this.state.newBeerName === "")
        return this.notifier.warning("il nome della birra non deve essere vuoto");
      if (isNotValidPositiveQuantity(this.state.newBeerQuantity))
        return this.notifier.warning("la quantita' di litri di birra prodotta deve essere strettamente positiva");
      if(this.state.newBeerQuantity > parseFloat(this.state.equipment)) {
        this.setState({missingEquipment: true});
        this.notifier.warning("la capacita' dell'equipaggiamento e' insufficiente");
      } else {
        fetch(BEER_LIST_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.newBeerName,
            recipeID: this.state.recipeID,
            quantity: this.state.newBeerQuantity,
          }),
        })
        .then((response) => {
          if (response.status >= 400)
            throw new Error();
        })
        .then(() => {
          this.props.onConfirm();
          this.notifier.success("birra creata con successo");
        })
        .catch(() => {
          this.setState({missingEquipment: false, missingIngredients: true});
          this.notifier.warning("mancano degli ingredienti");
        })
      }
    });
  }

}
export default RecipeExecute;
