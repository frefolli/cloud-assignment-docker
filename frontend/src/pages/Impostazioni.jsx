import React, {Component} from 'react';
import themes from '../theme/themes';
import backgrounds from '../theme/backgrounds';
import BodyThemeManager from '../components/BodyThemeManager';
import Modal from '../components/Modal';
import MButton from '../components/MButton';
import SettingsReset from '../components/SettingsReset';
import NextRecipeReset from '../components/NextRecipeReset';
import {BACKGROUND_MANAGER_TRIGGER,
  THEME_MANAGER_TRIGGER,
  NAVBAR_THEME_MANAGER_TRIGGER,
  LAST_USED_THEME_LOCALSTORAGE_KEY,
  DEFAULT_BACKGROUND,
  DEFAULT_THEME,
  LAST_USED_BACKGROUND_LOCALSTORAGE_KEY,
  FAKE_NOTIFIER} from '../utils/Protocol';
import InputFieldSetting from '../components/InputFieldSetting';
import InputSelectorSetting from '../components/InputSelectorSetting';
import JimTable from '../components/JimTable';
import JimFlex from '../components/JimFlex';
import InputQuantitySetting from '../components/InputQuantitySetting';
import SettingsManager from '../utils/SettingsManager';
import twins from '../theme/twins';
import LoadingScreen from '../components/LoadingScreen';

export default class Impostazioni extends Component {
  static propTypes = {
    notifier: PropTypes.object,
    masterCall: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentAction: '',
      showModal: false,
      colors: Object.keys(themes).map((key) => {
        return {name: key, value: key};
      }),
      backgrounds: Object.keys(backgrounds).map((key) => {
        return {name: key, value: key};
      }),
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.settingsManager = new SettingsManager();
  }

  queryColorSetting = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('color')
          .then((data) => this.setState({color: data.value}))
          .then(acc).catch(() => {
            this.settingsManager.postSetting('color', DEFAULT_THEME)
                .then(() => this.setState({color: DEFAULT_THEME}))
                .then(acc).catch(rej);
          });
    });
  };

  queryBackgroundSetting = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('background')
          .then((data) => this.setState({background: data.value}))
          .then(acc).catch(() => {
            this.settingsManager.postSetting('background', DEFAULT_BACKGROUND)
                .then(() => this.setState({background: DEFAULT_BACKGROUND}))
                .then(acc).catch(rej);
          });
    });
  };

  queryEquipmentSetting = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('equipment')
          .then((data) => this.setState({equipment: data.value}))
          .then(acc).catch(() => {
            this.settingsManager.postSetting('equipment', '30')
                .then(() => this.setState({equipment: '30'}))
                .then(acc).catch(rej);
          });
    });
  };

  queryNameSetting = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting('name')
          .then((data) => this.setState({name: data.value}))
          .then(acc).catch(() => {
            this.settingsManager.postSetting('name', '')
                .then(() => this.setState({name: ''}))
                .then(acc).catch(rej);
          });
    });
  };

  triggerReload = () => {
    this.queryColorSetting()
        .then(this.queryBackgroundSetting)
        .then(this.queryEquipmentSetting)
        .then(this.queryNameSetting)
        .then(() => this.setState({isLoading: false}))
        .catch(this.notifier.connectionError);
  };

  setNewEquipment = (event) => {
    const newEquipment = event.target.value;
    this.setState({equipment: newEquipment});
  };

  setNewName = (event) => {
    const newName = event.target.value;
    this.setState({name: newName});
  };

  setNewBackground = (event, noTwin) => {
    const newBackground = event.target.value;
    this.setState({background: newBackground});
    this.settingsManager.putSetting('background', newBackground)
        .then(() => document.cookie=BACKGROUND_MANAGER_TRIGGER)
        .then(() => localStorage.setItem(
            LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, newBackground))
        .then(this.notifyMaster)
        .then(() => {
          if (noTwin !== true) {
            const twinOfBackground = twins.getTwinOfBackground(newBackground);
            if (twinOfBackground !== undefined) {
              this.setNewColor({target: {value: twinOfBackground}}, true);
            }
          }
        })
        .catch(() => this.notifier.error('impossibile cambiare lo sfondo'));
  };

  setNewColor = (event, noTwin) => {
    const newColor = event.target.value;
    this.setState({color: newColor});
    this.settingsManager.putSetting('color', newColor)
        .then(() => document.cookie=THEME_MANAGER_TRIGGER)
        .then(() => document.cookie=NAVBAR_THEME_MANAGER_TRIGGER)
        .then(() => localStorage.setItem(
            LAST_USED_THEME_LOCALSTORAGE_KEY, newColor))
        .then(this.notifyMaster)
        .then(() => {
          if (noTwin !== true) {
            const twinOfColor = twins.getTwinOfColor(newColor);
            if (twinOfColor !== undefined) {
              this.setNewBackground({target: {value: twinOfColor}}, true);
            }
          }
        })
        .catch(() => this.notifier.error('impossibile cambiare il tema'));
  };

  handleSetEquipment = () => {
    this.settingsManager.putSetting('equipment', this.state.equipment)
        .then(() => this.notifier.success(
            'equipaggiamento aggiornato con successo'))
        .catch(() => this.notifier.error(
            'impossibile cambiare l\'equipaggiamento'));
  };

  handleSetName = () => {
    if (this.state.name === '') {
      this.notifier.warning('il nome non deve essere vuoto');
      return this.triggerReload();
    }
    this.settingsManager.putSetting('name', this.state.name)
        .then(() => this.notifier.success('nome aggiornato con successo'))
        .catch(() => this.notifier.error('impossibile cambiare il nome'));
  };

  notifyMaster = () => {
    if (this.props.masterCall) {
      this.props.masterCall();
    }
  };

  componentDidMount = () => {
    this.triggerReload();
  };

  closeModal = () => this.setShowModal(false);
  closeModalAndReload = () => {
    this.closeModal(); this.triggerReload();
  };
  handleResetSettings = () => {
    this.setShowModal(true);
    this.setState({currentAction: 'resetSettings'});
  };
  handleResetNextRecipeID = () => {
    this.setShowModal(true);
    this.setState({currentAction: 'resetRecipeID'});
  };

  getCurrentComponent = () => {
    const currentAction = this.state.currentAction;
    switch (currentAction) {
      case 'resetSettings':
        return <SettingsReset
          masterCall={this.props.masterCall}
          notifier={this.notifier}
          onConfirm={this.closeModalAndReload}/>;
      case 'resetRecipeID':
        return <NextRecipeReset
          notifier={this.notifier}
          onConfirm={this.closeModal}/>;
      default:
        return <div></div>;
    }
  };

  setShowModal = (flag) => {
    if (!flag) {
      this.setState({currentAction: ''});
    }
    this.setState({showModal: flag});
  };

  render() {
    const settingsPanel = () => (
      <JimFlex>
        <InputQuantitySetting
          value={this.state.equipment}
          title="Equipaggiamento Disponibile"
          label="Equipment"
          onChange={this.setNewEquipment}
          onConfirm={this.handleSetEquipment}/>
        <InputFieldSetting
          value={this.state.name}
          title="Inserisci qui il tuo nome"
          label="Name"
          onChange={this.setNewName}
          onConfirm={this.handleSetName}/>
        <InputSelectorSetting
          title="Seleziona il colore del tema"
          label="Color"
          value={this.state.color}
          onChange={this.setNewColor}
          options={this.state.colors}/>
        <InputSelectorSetting
          title="Seleziona lo sfondo"
          label="Background"
          value={this.state.background}
          onChange={this.setNewBackground}
          options={this.state.backgrounds}/>
        <JimTable>
          <MButton center text="Elimina tutti i dati"
            onClick={this.handleResetSettings}/>
        </JimTable>
        <JimTable>
          <MButton center text="Resetta la prossima ricetta da eseguire"
            onClick={this.handleResetNextRecipeID}/>
        </JimTable>
      </JimFlex>
    );

    return (
      <BodyThemeManager>
        <LoadingScreen isLoading={this.state.isLoading}/>
        {this.state.isLoading ? null : settingsPanel()}
        <Modal showModal={this.state.showModal}
          setShowModal={this.setShowModal}>
          {this.getCurrentComponent()}
        </Modal>
      </BodyThemeManager>
    );
  }
}
