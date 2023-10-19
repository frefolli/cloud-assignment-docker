import React, { Component } from "react";
import BeerView from "../components/BeerView";
import BeerEdit from "../components/BeerEdit";
import BeerDelete from "../components/BeerDelete";
import Modal from "../components/Modal";
import MButton from "../components/MButton";
import BodyThemeManager from '../components/BodyThemeManager'
import {BEER_LIST_ENDPOINT, BEERS_ENDPOINT, RECIPE_ENDPOINT, FAKE_NOTIFIER  } from '../utils/Protocol';
import Selector from "../components/Selector";
import BeerTable from "../components/BeerTable";
import JimTable from "../components/JimTable";
import { TextField } from "@mui/material";
import JimFlex from "../components/JimFlex";
import JimGrid from "../components/JimGrid";
import LoadingScreen from "../components/LoadingScreen";


class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerIDs: [],
      beers: [],
      currentAction: "",
      selectedBeer: null,
      showModal: false,
      filterRecipe: "",
      filterName: "",
      beerIDsFiltered: [],
      recipes: [],
      isLoading: true
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
    fetch(BEER_LIST_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const beerIDs = data;
        const beerIDsFiltered = data;
        const promises = beerIDs.map((id) => fetch(BEERS_ENDPOINT+`${id}`));
        Promise.all(promises).then((results) => {
          const beers = results.map((response) => response.json());
          Promise.all(beers)
            .then((updatedBeers) => {
              this.setState({
                beerIDs,
                beers: updatedBeers,
                beerIDsFiltered,
              });
              return updatedBeers
                .map((beer) => beer.recipeID)
                .filter((value, index, self) => (self.indexOf(value) === index) && value !== null);
            })
            .then((updatedRecipes) => {
              Promise.all(
                updatedBeers.map((recipeID) => fetch(RECIPE_ENDPOINT+`${recipeID}`))
              )
                .then((responses) =>
                  Promise.all(responses.map((response) => response.json()))
                )
                .then((data) => {
                  this.setState({ recipes: data, isLoading: false });
                });
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
      currentAction: "view",
      selectedBeer: item
    });
  }

  handleEdit = (item) => {
    this.setShowModal(true);
    this.setState({
      currentAction: "edit",
      selectedBeer: item
    });
  }

  handleDelete = (item) => {
    this.setShowModal(true);
    this.setState({
      currentAction: "delete",
      selectedBeer: item
    });
  }

  setShowModal = (flag) => {
    if (!flag)
      this.setState({ currentAction: "" })
    this.setState({ showModal: flag });
  };

  handleDeleteConfirm = () => {
    const beerToDeleteID = this.state.selectedBeer.beerID;
     fetch(BEERS_ENDPOINT+`${beerToDeleteID}`, {
      method: "DELETE",
    })
    .then(this.notifier.onRequestError("impossibile eliminare la birra"))
    .then(this.notifier.onRequestSuccess("birra eliminata correttamente"))
    .then(() => {
      this.triggerReload();
      this.setShowModal(false);
    })
  };

  getCurrentComponent = () => {
    let selectedBeer = this.state.selectedBeer;
    let currentAction = this.state.currentAction;

    if (selectedBeer === null) {
      return null;
    }

    switch (currentAction) {
      case "view":
        return (
        <BeerView
          notifier={this.notifier}
          beerID={selectedBeer.beerID}
        />);
      case "edit":
        return (
          <BeerEdit
            notifier={this.notifier}
            beerID={selectedBeer.beerID}
            onConfirm={this.triggerReload}
          />
        );
      case "delete":
        return (
          <BeerDelete
            beerID={selectedBeer.beerID}
            onConfirm={this.handleDeleteConfirm}
          />
        );
      default:
        return null;
    }
  }

  setFilterName = (event) => {
    let filterName = event.target.value;
    this.setState({ filterName: filterName });
  }

  setFilterRecipe = (event) => {
    let filterRecipe = event.target.value;
    this.setState({ filterRecipe: filterRecipe });
  }

  render() {
    const { beerIDsFiltered, beers } = this.state;

    const beerItems = beerIDsFiltered.map((item) => {
      const beer = beers.find((b) => b.beerID === item);
      return beer
    });

    return (
      <BodyThemeManager>
        <div>
          <LoadingScreen isLoading={this.state.isLoading}/>
          <JimFlex>
            <JimTable>
                <p style={{textAlign:"center"}}>FILTRA PER NOME</p>
                <JimGrid>
                  <TextField
                    label="Name"
                    value={this.state.filterName}
                    type="text"
                    style={{ width: "100%", textAlign: "center" }}
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
                <p style={{textAlign:"center"}}>FILTRA PER RICETTA</p>
                <JimGrid>
                  <Selector optional
                    label="Recipe"
                    value={this.state.filterRecipe}
                    onChange={this.setFilterRecipe}
                    options={this.state.recipes.map((recipe) => { return {name: recipe.name, value: recipe.recipeID}; })}
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
    let url = BEER_LIST_ENDPOINT+"?";
    if (this.state.filterName !== "")
      url += `&&name=${this.state.filterName}`;
    if (this.state.filterRecipe !== "")
      url += `&&recipeID=${this.state.filterRecipe}`;

    fetch(url)
    .then((response) => response.json())
    .then((beerIDsFiltered) => {
      this.setState({ beerIDsFiltered: beerIDsFiltered });
    })
    .catch(this.notifier.connectionError)
  }

  removeFilter = () => {
    this.setState({
      beerIDsFiltered: this.state.beerIDs,
      filterName: "",
      filterRecipe: "",
    });
  }
}
export default Birre;
