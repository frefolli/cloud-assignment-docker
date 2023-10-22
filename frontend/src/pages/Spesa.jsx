import React, {Component} from 'react';
import MButton from '../components/MButton';
import {FAKE_NOTIFIER, isNotValidPositiveQuantity} from '../utils/Protocol';
import BodyThemeManager from '../components/BodyThemeManager';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingIngredientTable from '../components/ShoppingIngredientTable';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingManager from '../utils/ShoppingManager';

class Spesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      newIngredientName: '',
      newIngredientQuantity: '0',
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.shoppingManager = new ShoppingManager();
  }

  handleClear = () => {
    this.setState({
      ingredients: [],
      newIngredientName: '',
      newIngredientQuantity: '0',
    });
  };

  handleSubmit = () => {
    if (this.state.ingredients.length === 0) {
      return this.notifier.warning('devi inserire almeno un ingrediente');
    }

    for (const ingredient of this.state.ingredients) {
      const {quantity} = ingredient;
      if (isNotValidPositiveQuantity(quantity)) {
        return this.notifier.warning(
            'le quantita\' dei singoli ingredienti' +
          'devono essere strettamente positive');
      }
    }

    this.shoppingManager.doShopping(this.state.ingredients)
        .then(this.notifier.onRequestErrorResolvePromise(() => {
          throw new Error();
        }))
        .then(() => this.notifier.success(
            'ingredienti inventariati con successo'))
        .then(() => {
          this.setState({
            ingredients: [],
            newIngredientName: '',
            newIngredientQuantity: '0',
          });
        })
        .catch(this.notifier.connectionError);
  };

  setNewIngredientName = (event) => {
    const newName = event.target.value;
    this.setState({newIngredientName: newName});
  };

  setNewIngredientQuantity = (event) => {
    const newQuantity = event.target.value;
    this.setState({newIngredientQuantity: newQuantity});
  };

  handleDeleteIngredient = (name) => {
    this.setState({
      ingredients: this.state.ingredients.filter(
          (ingredient) => ingredient.name !== name),
    });
  };

  handleAddIngredient = () => {
    if (this.state.newIngredientName === '') {
      return this.notifier.warning(
          'il nome dell\'ingrediente non deve essere vuoto');
    }

    const sameNameIngredients = this.state.ingredients.filter(
        (ingredient) => ingredient.name === this.state.newIngredientName);
    if (sameNameIngredients.length !== 0) {
      this.setState({ingredients: (
        this.state.ingredients.map((ingredient) => {
          if (ingredient.name === this.state.newIngredientName) {
            ingredient.quantity = Number(ingredient.quantity) +
            Number(this.state.newIngredientQuantity);
          }
          return ingredient;
        })),
      newIngredientName: '',
      newIngredientQuantity: '0',
      });
    } else {
      this.setState({ingredients: (
        this.state.ingredients
            .concat({
              name: this.state.newIngredientName,
              quantity: this.state.newIngredientQuantity,
            })),
      newIngredientName: '',
      newIngredientQuantity: '0',
      });
    }
  };

  handleIngredientChange = (name, event) => {
    const quantity = event.target.value;
    this.setState({ingredients:
      this.state.ingredients.map((item) => {
        if (item.name === name) {
          item.quantity=quantity;
        }
        return item;
      }),
    });
  };

  render() {
    return (
      <BodyThemeManager>
        <ShoppingIngredientTable
          ingredients={this.state.ingredients}
          editQuantity={this.handleIngredientChange}
          deleteIngredient={this.handleDeleteIngredient}
          newIngredientName={this.state.newIngredientName}
          setNewIngredientName={this.setNewIngredientName}
          newIngredientQuantity={this.state.newIngredientQuantity}
          setNewIngredientQuantity={this.setNewIngredientQuantity}
          addIngredient={this.handleAddIngredient}
        />
        <div id="shoppingButtonContainer">
          <MButton startIcon={<ShoppingCartCheckoutIcon/>}
            text="Conferma" onClick={this.handleSubmit}/>
          <MButton startIcon={<RemoveShoppingCartIcon/>}
            text="Svuota" onClick={this.handleClear}/>
        </div>
      </BodyThemeManager>
    );
  }
}

export default Spesa;
