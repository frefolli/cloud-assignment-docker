import React, {Component} from 'react';
import RecipeView from './RecipeView';
import MButton from './MButton';
import {FAKE_NOTIFIER, ADVICE_VIEW_TRIGGER, NEXT_RECIPE_VIEW_TRIGGER, NEXT_RECIPE_VIEW_ESCAPE} from '../utils/Protocol';
import ShoppingList from './ShoppingList';
import {TextField} from '@mui/material';
import SettingsManager from '../utils/SettingsManager';
import ShoppingManager from '../utils/ShoppingManager';
import BirreIcon from '../svgicons/BirreIcon';
import BeersManager from '../utils/BeersManager';

/**
 * This component is responsible for displaying the next recipe and managing actions related to it.
 *
 * @class NextRecipeView
 *
 * @param {Object} props - The component's properties.
 * @param {Notifier} props.notifier - An optional notifier for displaying notifications (default: FAKE_NOTIFIER).
 * @param {boolean} props.testNextRecipeCookie - A flag to simulate testing the "Next Recipe" cookie (default: false).
 *
 * @returns {JSX.Element} The NextRecipeView component for managing the next recipe.
 *
 * @example
 * // Example usage of the NextRecipeView component
 * <NextRecipeView notifier={customNotifier} testNextRecipeCookie={true} />
 */

export default class NextRecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: [],
      newBeerName: 'new Beer',
      nextRecipeQuantity: null,
      nextRecipeID: '',
      equipment: '',
      recipe: {},
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.settingsManager = new SettingsManager();
    this.shoppingManager = new ShoppingManager();
    this.beersManager = new BeersManager();
  }

  getNextRecipeID = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('nextRecipeID')
          .then((data) => {
            if (data.value !== '') {
              this.setState({nextRecipeID: data.value}, acc);
            } else rej();
          })
          .catch((err) => {
            this.settingsManager.putSetting('nextRecipeID', '')
                .then(rej).catch(() => rej(err));
          });
    });
  };

  getNextRecipeQuantity = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('nextRecipeQuantity')
          .then((data) => {
            if (Number(data.value) > 0) {
              this.setState({nextRecipeQuantity: data.value}, acc);
            } else rej();
          })
          .catch((err) => {
            this.settingsManager.putSetting('nextRecipeQuantity', '0')
                .then(rej).catch(() => rej(err));
          });
    });
  };

  getShoppingList = () => {
    return new Promise((acc, rej) => {
      this.shoppingManager.getShoppingList({
        recipeID: this.state.nextRecipeID,
        quantity: this.state.nextQuantity,
      })
          .then((data) => this.setState({missingIngredients: data}, acc))
          .catch((err) => rej(err));
    });
  };

  getEquipment = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('equipment')
          .then((data) => {
            if (data.value !== '') {
              this.setState({equipment: Number(data.value)}, acc);
            } else rej();
          })
          .catch((err) => rej(err));
    });
  };

  componentDidMount() {
    if (this.props.testNextRecipeCookie) {
      document.cookie = NEXT_RECIPE_VIEW_TRIGGER;
    }
    this.triggerReload();
  }

  triggerReload = () => {
    this.setState({
      missingIngredients: [],
      newBeerName: 'new Beer',
      nextRecipeQuantity: null,
      nextRecipeID: '',
      equipment: '',
      recipe: {},
    }, () => {
      this.getNextRecipeID()
          .then(this.getNextRecipeQuantity)
          .then(this.getShoppingList)
          .then(this.getEquipment)
          .catch((err) => !err || this.notifier.connectionError());
    });
  };

  setNewBeerName = (event) => {
    const newBeerName = event.target.value;
    this.setState({newBeerName: newBeerName});
  };

  render() {
    if (document.cookie.includes(NEXT_RECIPE_VIEW_TRIGGER)) {
      document.cookie = NEXT_RECIPE_VIEW_ESCAPE;
      this.triggerReload();
    }

    const action = () => {
      if (this.state.equipment < this.state.nextRecipeQuantity) {
        return (
          <div>
            <center>
              <h2>Equipaggiamento Mancante</h2>
              <h2>Si chiede di fare {this.state.nextRecipeQuantity} litri ma si dispone di una capacita' di {this.state.equipment} litri</h2>
            </center>
          </div>
        );
      } else if (this.state.missingIngredients.length !== 0) {
        return (<ShoppingList recipeID={this.state.nextRecipeID} quantity={this.state.nextRecipeQuantity}/>);
      } else {
        return <div>
          <h3 style={{textAlign: 'center'}}>Quantita' in litri prevista: {this.state.nextRecipeQuantity}</h3>
          <table className="myTable">
            <tbody>
              <tr>
                <td>Nuova Birra</td>
                <td>
                  <TextField
                    label="Beer Name"
                    value={this.state.newBeerName}
                    style={{width: '90%', textAlign: 'center'}}
                    onChange={this.setNewBeerName}
                  />
                </td>
                <td>
                  <MButton startIcon={<BirreIcon/>} text="Crea" onClick={() => this.addBeer()} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>;
      }
    };

    return (
      <div>
        {this.state.nextRecipeID === null || this.state.nextRecipeID === '' ? (
              <h1 className="advice-texts">Nessuna ricetta in programma</h1>
            ) : (
              <div>
                <h1 className="advice-texts">Ecco la prossima birra in programma</h1>
                <RecipeView recipeID={this.state.nextRecipeID}/>
                {action()}
              </div>
            )}
      </div>
    );
  }

  addBeer() {
    if (this.state.newBeerName === '') {
      return this.notifier.warning('il nome della birra non deve essere vuoto');
    } else {
      this.beersManager.postBeer({
        name: this.state.newBeerName,
        recipeID: this.state.nextRecipeID,
        quantity: this.state.nextRecipeQuantity,
      })
          .then(() => {
            this.resetNextRecipeSettings();
            this.notifier.success('birra creata con successo');
          })
          .catch(() => {
            this.setState({missingIngredients: true});
            this.notifier.warning('mancano degli ingredienti');
          });
    }
  }

  resetNextRecipeSettings = () => {
    this.settingsManager.putSetting('nextRecipeID', '')
        .then(() => this.settingsManager.putSetting('nextRecipeQuantity', ''))
        .then(() => this.setState({
          nextRecipeQuantity: null,
          nextRecipeID: '',
        }))
        .then(() => document.cookie = ADVICE_VIEW_TRIGGER)
        .then(this.props.masterCall)
        .then(this.triggerReload);
  };
}
