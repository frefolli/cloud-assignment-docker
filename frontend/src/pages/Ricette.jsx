import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";
import RecipeExecute from "../components/RecipeExecute";
import MButton from '../components/MButton';
import { FAKE_NOTIFIER, isNotValidPositiveQuantity } from '../utils/Protocol';
import RecipesManager from '../utils/RecipesManager';
import Selector from '../components/Selector';
import RecipeTable from '../components/RecipeTable';
import JimTable from '../components/JimTable';
import BodyThemeManager from '../components/BodyThemeManager';
import QuantityInput from '../components/QuantityInput';
import JimFlex from '../components/JimFlex';
import JimGrid from '../components/JimGrid';
import SettingsManager from '../utils/SettingsManager';
import LoadingScreen from '../components/LoadingScreen';
import { TextField } from '@mui/material';

export default class Ricette extends Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: [], currentAction: "", 
          nextRecipeQuantity: "", nextRecipeID: "", 
          selectedRecipe: null, showModal:false, 
          newRecipeName: "", newRecipeDescription: "", 
          filterName: "", recipesFiltered: [],
          isLoading: true
        };
        this.notifier = this.props.notifier || FAKE_NOTIFIER;
        this.settingsManager = new SettingsManager();
        this.recipesManager = new RecipesManager();
    }

    triggerReload = () => {
        return new Promise((acc, rej) => {
          this.recipesManager.getRecipeList()
          .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => this.recipesManager.getRecipe(recipeID))))
          .then(data => this.setState({
            recipes: data, recipesFiltered: data,
            newRecipeName: "", newRecipeDescription: "",
            isLoading: false
          }))
          .then(acc).catch(rej)
        })
    }

    getNextRecipeID = () => {
      return new Promise((acc, rej) => {
        this.settingsManager.getSetting("nextRecipeID")
        .then(data => {
          if (data.value !== "") {
            this.setState({nextRecipeID: data.value})
          }
          acc();
        })
        .catch((err) => {
          this.settingsManager.putSetting("nextRecipeID", "")
          .then(acc).catch(rej)
        })
      })
    }

    getNextRecipeQuantity = () => {
      return new Promise((acc, rej) => {
        this.settingsManager.getSetting("nextRecipeQuantity")
        .then(data => {
          if (data.value !== "") {
            this.setState({nextRecipeQuantity: data.value})
          }
          acc();
        })
        .catch((err) => {
          this.settingsManager.putSetting("nextRecipeQuantity", "0")
          .then(acc).catch(rej)
        })
      })
    }

    componentDidMount() {
      this.triggerReload()
      .then(this.getNextRecipeID)
      .then(this.getNextRecipeQuantity)
      .catch(this.notifier.connectionError);
    }

    handleView = (item) => {
      this.setState({currentAction:"view", selectedRecipe:item, showModal:true})
    };

    handleEdit = (item) => {
      this.setState({currentAction:"edit", selectedRecipe:item, showModal:true})
    };
    
    handleDelete = (item) => {
      this.setShowModal(true);
      this.setState({currentAction:"delete", selectedRecipe:item});
    };
    
    finalizeDeleteHandle = (id) => {
      if(id === this.state.nextRecipeID) {
        this.settingsManager.putSetting("nextRecipeID", "")
        .then(() => this.settingsManager.putSetting("nextRecipeQuantity", "0"))
        .then(this.closeModalAndReload)
      } else this.closeModalAndReload();
    };

    handleExecute = (item) => {
      this.setState({currentAction:"execute", selectedRecipe:item, showModal:true})
    };

    closeModal = () => this.setShowModal(false);
    closeModalAndReload = () => {this.closeModal(); this.triggerReload()};

    getCurrentComponent = () => {
      let selectedRecipe = this.state.selectedRecipe;
      let currentAction = this.state.currentAction;
      if (!selectedRecipe) return <div>Caricamento...</div>;
      switch (currentAction) {
        case "view":
          return <RecipeView notifier={this.notifier} recipeID={selectedRecipe.recipeID}/>;
        case "edit":
          return <RecipeEdit notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.triggerReload}/>;
        case "delete":
          return <RecipeDelete notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.finalizeDeleteHandle}/>;
        case "execute":
          return <RecipeExecute notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.closeModal}/>;
        default:
          return <div></div>;
      }
    }

    setNewRecipeName = (event) => {
      let newRecipeName = event.target.value;
      this.setState({newRecipeName: newRecipeName});
    }

    setFilterName = (event) => {
      let filterName = event.target.value;
      this.setState({filterName: filterName});
    }
  
    setNewRecipeDescription = (event) => {
      let newRecipeDescription = event.target.value;
      this.setState({newRecipeDescription: newRecipeDescription});
    }

    setNewNextRecipeID = (event) => {
      let newNextRecipeID = event.target.value;
      this.setState({nextRecipeID: newNextRecipeID});
    }

    setNewNextRecipeQuantity = (event) => {
      let newNextRecipeQuantity = event.target.value;
      this.setState({nextRecipeQuantity: newNextRecipeQuantity});
    }

    setShowModal = (flag) => {
      if (!flag)
        this.setState({currentAction:""})
      this.setState({showModal:flag})
    }
    
    removeFilter = () => {
      this.setState({recipesFiltered: this.state.recipes, filterName: ""})
    }

    programRecipe = () => {
      if (this.state.nextRecipeID === "")
        return this.notifier.warning("devi selezionare una ricetta per impostarla")
      if (isNotValidPositiveQuantity(this.state.nextRecipeQuantity))
        return this.notifier.warning("devi inserire una quantita' maggiore di zero")
      this.settingsManager.putSetting("nextRecipeID", this.state.nextRecipeID)
      .then(() => this.settingsManager.putSetting("nextRecipeQuantity", this.state.nextRecipeQuantity))
      .then(() => this.notifier.success("programmazione ricetta impostata correttamente"))
      .catch(this.notifier.connectionError)
    }

    render() {
        const {recipesFiltered} = this.state;
        return (
          <BodyThemeManager>
            <div>
              <LoadingScreen isLoading={this.state.isLoading}/>
              <JimFlex>
                <JimTable>
                  <p style={{textAlign:"center"}}>FILTRA PER NOME</p>
                  <TextField
                    label="Name"
                    value={this.state.filterName} type="text"
                    style={{
                      marginRight:"5%", marginLeft:"5%",
                      marginTop:"1%", marginBottom:"1%",
                      width: "90%", textAlign:"center"}}
                    onChange={this.setFilterName}
                  />
                  <JimGrid>
                    <MButton text="Filtra" onClick={this.filterRecipe}/>
                  </JimGrid>
                  <JimGrid>
                    <MButton text="Togli" onClick={this.removeFilter}/>
                  </JimGrid>
                </JimTable>
                <JimTable>
                  <p style={{textAlign:"center"}}>Seleziona la prossima ricetta</p>
                  <JimGrid>
                    <Selector optional
                      label="Recipe"
                      value={this.state.nextRecipeID}
                      onChange={this.setNewNextRecipeID}
                      options={this.state.recipes.map((recipe) => { return {name: recipe.name, value: recipe.recipeID}; })}
                    />
                  </JimGrid>
                  <JimGrid>
                    <QuantityInput
                      label="Quantity"
                      value={this.state.nextRecipeQuantity}
                      onChange={this.setNewNextRecipeQuantity}
                    />
                  </JimGrid>
                  <JimGrid>
                    <MButton text="Programma" onClick={this.programRecipe}/>
                  </JimGrid>
                </JimTable>
              </JimFlex>

              <RecipeTable
                recipes={recipesFiltered}
                handleView={this.handleView}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleExecute={this.handleExecute}
                newRecipeName={this.state.newRecipeName}
                newRecipeDescription={this.state.newRecipeDescription}
                setNewRecipeName={this.setNewRecipeName}
                setNewRecipeDescription={this.setNewRecipeDescription}
                addRecipe={this.addRecipe}
                />
              <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
                {this.getCurrentComponent()}
              </Modal>
            </div>
          </BodyThemeManager>
        );
    }

    addRecipe = () => {
      if (this.state.newRecipeName === "")
        return this.notifier.warning("il nome della ricetta non deve essere vuoto");
      this.recipesManager.postRecipe({name: this.state.newRecipeName, description: this.state.newRecipeDescription})
      .then(() => this.notifier.success("ricetta creata correttamente"))
      .then(() => this.triggerReload())
      .catch(() => this.notifier.error("impossibile creare la ricetta"));
    }

    filterRecipe = () => {
      this.recipesManager.getRecipeList({name: this.state.filterName})
      .then(recipesIDsFiltered => {
        let recipeFiltered = this.state.recipes.filter(recipe => recipesIDsFiltered.includes(recipe.recipeID));
        this.setState({recipesFiltered: recipeFiltered});
      })
      .catch(this.notifier.connectionError);
    }
}
