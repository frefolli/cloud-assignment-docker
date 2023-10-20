import React, { Component } from "react";
import {DEFAULT_NOTE_TYPE, FAKE_NOTIFIER} from '../utils/Protocol';
import BeerNoteTable from "./BeerNoteTable";
import InputFieldSetting from "./InputFieldSetting";
import BeersManager from '../utils/BeersManager';

/**
 * This class represents a component for editing beer details, including name and notes.
 * @class BeerEdit
 * 
 * @param {Object} props - The component's properties.
 * @param {number} props.beerID - The unique identifier for the beer.
 * @param {Notifier} [props.notifier] - An optional notifier for displaying notifications (default: FAKE_NOTIFIER).
 *
 * @returns {JSX.Element} The rendered BeerEdit component.
 *
 * @example
 * // Example usage of the BeerEdit component:
 * <BeerEdit beerID={123} notifier={customNotifier} />
 */

class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], name: "",
      noteType: DEFAULT_NOTE_TYPE, description: ""
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.beersManager = new BeersManager();
  }

  triggerReload = () => {
    this.beersManager.getBeer(this.props.beerID)
    .then(data => {
      this.setState({...data, noteType: DEFAULT_NOTE_TYPE, description: ""});
    })
    .catch(this.notifier.connectionError);
  }

  componentDidMount() {
    this.triggerReload();
  }

  handleInputChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDeleteNote = (note) => {
    const { beerID, noteID } = note;
    this.beersManager.deleteNote(beerID, noteID)
    .then(this.notifier.onRequestError("impossibile eliminare la nota"))
    .then(() => this.triggerReload());
  };

  handleNoteTypeChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex((n) => n.noteID === note.noteID);
    notes[i].noteType = event.target.value;
    this.setState({ notes });
  };

  handleDescriptionChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex((n) => n.noteID === note.noteID);
    notes[i].description = event.target.value;
    this.setState({ notes });
  };

  handleNameChange = () => {
    const { beerID } = this.props;
    const { name } = this.state;
    if (name === "")
      return this.notifier.warning("il nome della birra non deve essere vuoto");

    this.beersManager.putBeer(beerID, {name: name})
    .then(() => this.notifier.success("nome modificato correttamente"))
    .then(() => this.triggerReload())
    .then(() => this.props.onConfirm())
    .catch(() => this.notifier.error("impossibile cambiare il nome"));
  };

  handleAddNote = (noteType, description) => {
    const { beerID } = this.props;
    this.beersManager.postNote(beerID, {name: name})
    .then(() => this.triggerReload())
    .catch(() => this.notifier.error("impossibile aggiungere la nota"));
  };

  handleEditNote = (note) => {
    const { beerID, description, noteType, noteID } = note;

    this.beersManager.putNote(beerID, noteID, {description, noteType})
    .then(() => this.triggerReload())
    .catch(() => this.notifier.error("impossibile aggiornare la nota"));
  };

  render() {
    return (
        <div>
          <center>
            <InputFieldSetting
              label="Name"
              id="inputBeerEdit"
              data-testid="inputBeerEdit"
              value={this.state.name}
              onChange={this.handleInputChange}
              onConfirm={this.handleNameChange}
            />
            <h1>note:</h1>
            <BeerNoteTable
              notes={this.state.notes}
              newNoteType={this.state.noteType}
              newDescription={this.state.description}
              setNewNoteType={(event) => this.setState({noteType: event.target.value})}
              setNewDescription={(event) => this.setState({description: event.target.value})}
              editNote={this.handleEditNote}
              deleteNote={this.handleDeleteNote}
              handleNoteTypeChange={this.handleNoteTypeChange}
              handleDescriptionChange={this.handleDescriptionChange}
              addNote={() => this.handleAddNote(this.state.noteType, this.state.description)}
            />
          </center>
        </div>
    );
  }
}

export default BeerEdit;
