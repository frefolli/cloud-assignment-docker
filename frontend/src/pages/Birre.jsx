import React, {Component} from 'react';
import BeerView from '../components/BeerView';
import BeerEdit from '../components/BeerEdit';
import BeerDelete from '../components/BeerDelete';
import Modal from '../components/Modal';
import MButton from '../components/MButton';
import BodyThemeManager from '../components/BodyThemeManager';
import {FAKE_NOTIFIER} from '../utils/Protocol';
import Selector from '../components/Selector';
import BeerTable from '../components/BeerTable';
import JimTable from '../components/JimTable';
import {TextField} from '@mui/material';
import JimFlex from '../components/JimFlex';
import JimGrid from '../components/JimGrid';
import LoadingScreen from '../components/LoadingScreen';
import RecipesManager from '../utils/RecipesManager';
import BeersManager from '../utils/BeersManager';


class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerIDs: [],
      beers: [],
      currentAction: '',
      selectedBeer: null,
      showModal: false,
      filterRecipe: '',
      filterName: '',
      beerIDsFiltered: [],
      recipes: [],
      isLoading: true,
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.recipesManager = new RecipesManager();
    this.beersManager = new BeersManager();
  }

  triggerReload = () => {
    this.beersManager.getBeerList()
        .then((data) => {
          const beerIDs = data;
          const beerIDsFiltered = data;
          const beers = beerIDs.map((id) => this.beersManager.getBeer(id));
          Promise.all(beers)
              .then((updatedBeers) => {
                this.setState({
                  beerIDs,
                  beers: updatedBeers,
                  beerIDsFiltered,
                });
                return updatedBeers
                    .map((beer) => beer.recipeID)
                    .filter((value, index, self) =>
                      (self.indexOf(value) === index) && value !== null);
              })
              .then((updatedRecipes) => {
                Promise.all(
                    updatedRecipes.map((recipeID) =>
                      this.recipesManager.getRecipe(recipeID)),
                )
                    .then((data) => {
                      this.setState({recipes: data, isLoading: false});
                    });
              });
        })
        .catch(this.notifier.connectionError);
  };

  componentDidMount() {
    this.triggerReload();
  }

  handleView = (item) => {
    this.setShowModal(true);
    this.setState({
      currentAction: 'view',
      selectedBeer: item,
    });
  };

  handleEdit = (item) => {
    this.setShowModal(true);
    this.setState({
      currentAction: 'edit',
      selectedBeer: item,
    });
  };

  handleDelete = (item) => {
    this.setShowModal(true);
    this.setState({
      currentAction: 'delete',
      selectedBeer: item,
    });
  };

  setShowModal = (flag) => {
    if (!flag) {
      this.setState({currentAction: ''});
    }
    this.setState({showModal: flag});
  };

  handleDeleteConfirm = () => {
    const beerToDeleteID = this.state.selectedBeer.beerID;
    this.beersManager.deleteBeer(beerToDeleteID)
        .then(() => this.notifier.success('birra eliminata correttamente'))
        .then(() => {
          this.triggerReload();
          this.setShowModal(false);
        })
        .catch(() => this.notifier.error('impossibile eliminare la birra'));
  };

  getCurrentComponent = () => {
    const selectedBeer = this.state.selectedBeer;
    const currentAction = this.state.currentAction;

    if (selectedBeer === null) {
      return null;
    }

    switch (currentAction) {
      case 'view':
        return (
          <BeerView
            notifier={this.notifier}
            beerID={selectedBeer.beerID}
          />);
      case 'edit':
        return (
          <BeerEdit
            notifier={this.notifier}
            beerID={selectedBeer.beerID}
            onConfirm={this.triggerReload}
          />
        );
      case 'delete':
        return (
          <BeerDelete
            beerID={selectedBeer.beerID}
            onConfirm={this.handleDeleteConfirm}
          />
        );
      default:
        return null;
    }
  };

  setFilterName = (event) => {
    const filterName = event.target.value;
    this.setState({filterName: filterName});
  };

  setFilterRecipe = (event) => {
    const filterRecipe = event.target.value;
    this.setState({filterRecipe: filterRecipe});
  };

  render() {
    const {beerIDsFiltered, beers} = this.state;

    const beerItems = beerIDsFiltered.map((item) => {
      const beer = beers.find((b) => b.beerID === item);
      return beer;
    });

    return (
      <BodyThemeManager>
        <div>
          <LoadingScreen isLoading={this.state.isLoading}/>
          <JimFlex>
            <JimTable>
              <p style={{textAlign: 'center'}}>FILTRA PER NOME</p>
              <JimGrid>
                <TextField
                  label="Name"
                  value={this.state.filterName}
                  type="text"
                  style={{width: '100%', textAlign: 'center'}}
                  onChange={(event) => this.setFilterName(event)}
                />
              </JimGrid>
              <JimGrid>
                <MButton text="Filtra" onClick={() => this.filterBeer()} />
              </JimGrid>
              <JimGrid>
                <MButton text="Togli" onClick={() => this.removeFilter()} />
              </JimGrid>
            </JimTable>
            <JimTable>
              <p style={{textAlign: 'center'}}>FILTRA PER RICETTA</p>
              <JimGrid>
                <Selector optional
                  label="Recipe"
                  value={this.state.filterRecipe}
                  onChange={this.setFilterRecipe}
                  options={this.state.recipes.map((recipe) => {
                    return {name: recipe.name, value: recipe.recipeID};
                  })}
                />
              </JimGrid>
              <JimGrid>
                <MButton text="Filtra" onClick={() => this.filterBeer()} />
              </JimGrid>
              <JimGrid>
                <MButton text="Togli" onClick={() => this.removeFilter()} />
              </JimGrid>
            </JimTable>
          </JimFlex>

          <BeerTable
            beers={beerItems}
            handleView={this.handleView}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
          <Modal
            showModal={this.state.showModal}
            setShowModal={this.setShowModal}
          >
            {this.getCurrentComponent()}
          </Modal>
        </div>
      </BodyThemeManager>
    );
  }

  filterBeer = () => {
    this.beersManager.getBeerList({
      name: this.state.filterName,
      recipe: this.state.filterRecipe,
    })
        .then((data) => this.setState({
          beerIDsFiltered: data,
        }))
        .catch(this.notifier.connectionError);
  };

  removeFilter = () => {
    this.setState({
      beerIDsFiltered: this.state.beerIDs,
      filterName: '',
      filterRecipe: '',
    });
  };
}
export default Birre;
