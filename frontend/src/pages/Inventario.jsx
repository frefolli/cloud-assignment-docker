import React, {Component} from 'react';
import IngredientDelete from '../components/IngredientDelete';
import Modal from '../components/Modal';
import {FAKE_NOTIFIER} from '../utils/Protocol';
import BodyThemeManager from '../components/BodyThemeManager';
import InventoryTable from '../components/InventoryTable';
import LoadingScreen from '../components/LoadingScreen';
import InventoryManager from '../utils/InventoryManager';

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      isLoading: true,
      showModal: false,
      ingredientID: null,
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.inventoryManager = new InventoryManager();
  }

  triggerReload = () => {
    this.inventoryManager.getIngredientList()
        .then((data) => {
          this.setState({inventory: data, isLoading: false});
        })
        .catch(this.notifier.connectionError);
  };

  componentDidMount() {
    this.triggerReload();
  }

  setShowModal = (value) => {
    this.setState({showModal: value});
  };

  handleDelete = (ingredientID) => {
    this.setState({
      showModal: true,
      ingredientID,
    });
  };

  handleDeleteConfirm = () => {
    const {ingredientID} = this.state;
    this.inventoryManager.deleteIngredient(ingredientID)
        .then(() => {
          this.setShowModal(false);
          this.triggerReload();
        })
        .catch(() => this.notifier.error('impossibile eliminare l\'ingrediente'));
  };

  render() {
    const {inventory} = this.state;

    return (
      <BodyThemeManager>
        <div>
          <LoadingScreen isLoading={this.state.isLoading}/>
          <InventoryTable
            items={inventory}
            handleDelete={this.handleDelete}
          />
          <Modal
            showModal={this.state.showModal}
            setShowModal={this.setShowModal}
          >
            {this.state.showModal && <IngredientDelete onConfirm={this.handleDeleteConfirm}/>}
          </Modal>
        </div>
      </BodyThemeManager>
    );
  }
}
export default Inventario;
