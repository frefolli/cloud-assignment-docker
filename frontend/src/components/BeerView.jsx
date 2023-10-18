import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from '../components/MButton';
import {BEERS_ENDPOINT, FAKE_NOTIFIER} from '../utils/Protocol';
import BeerNoteTableReadOnly from "./BeerNoteTableReadOnly";

/**
 * This class represents a component for viewing beer details, including name, recipe, and notes.
 * @class BeerView
 * 
 * @param {Object} props - The component's properties.
 * @param {number} props.beerID - The unique identifier for the beer.
 * @param {Notifier} [props.notifier] - An optional notifier for displaying notifications (default: FAKE_NOTIFIER).
 *
 * @returns {JSX.Element} The rendered BeerView component.
 *
 * @example
 * // Example usage of the BeerView component:
 * <BeerView beerID={123} notifier={customNotifier} />
 */

class BeerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRicetta: false,
      recipeID: null,
      name: "",
      notes: []
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
    fetch(BEERS_ENDPOINT + `${this.props.beerID}`)
    .then(response => response.json())
    .then(data => this.setState({...data}))
    .catch(this.notifier.connectionError)
  }

  componentDidMount() {
    this.triggerReload();
  }

  handleShowRicetta = async () => {
    this.setState({ showRicetta: true });
  };

  render() {
    const { showRicetta, recipeID, name } = this.state;

    const action = showRicetta
    ? (<RecipeView notifier={this.notifier} recipeID={recipeID}/>)
    : <MButton text="Visualizza Ricetta" onClick={this.handleShowRicetta}/>;

    const recipeView = (
      <div>
        {(recipeID !== null) ? (
          action
        ) : null}
      </div>
    );

    return (
      <div>
        <center>
          <h1>{name}</h1>
          {recipeView}
          <h1>note:</h1>
          <BeerNoteTableReadOnly
            notes={this.state.notes}
          />
        </center>
      </div>
    );
  }
}

export default BeerView;
