import React, { Component }  from "react";
import MButton from '../components/MButton';
import { BACKGROUND_MANAGER_TRIGGER, FAKE_NOTIFIER, NAVBAR_THEME_MANAGER_TRIGGER, RESET_ENDPOINT, THEME_MANAGER_TRIGGER } from '../utils/Protocol';

/**
 * The SettingsReset component allows users to reset all application settings and data.
 *
 * @class SettingsReset
 *
 * @param {Object} props - The component's properties.
 * @param {Function} [props.notifier] - An optional notifier object to handle notifications. If not provided, a fake notifier is used.
 * @param {Function} [props.masterCall] - An optional callback function to notify the master component after resetting settings.
 * @param {Function} [props.onConfirm] - An optional callback function to execute after the reset operation is confirmed.
 *
 * @returns {JSX.Element} The SettingsReset component.
 *
 * @example
 * // Example usage of the SettingsReset component
 * <SettingsReset
 *   notifier={notifier}
 *   masterCall={() => handleMasterCallback()}
 *   onConfirm={() => handleConfirm()}
 * />
 */

class SettingsReset extends Component{
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  notifyMaster = () => {
    if (this.props.masterCall)
      this.props.masterCall();
  }

  render(){
    return (
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere tutti i tuoi dati?</p>
            <MButton text="Conferma" onClick={() => this.resetAllSettings()} />
          </center>
        </div>
    );
  }

  resetAllSettings = () => {
    fetch(RESET_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(this.notifier.onRequestError("impossibile cancellare i dati"))
    .then(this.notifier.onRequestSuccessResolvePromise(() => {
      document.cookie=BACKGROUND_MANAGER_TRIGGER;
      document.cookie=THEME_MANAGER_TRIGGER;
      document.cookie=NAVBAR_THEME_MANAGER_TRIGGER;
      localStorage.clear();
      this.notifyMaster();
      this.notifier.success("dati cancellati con successo");
    }))
    .then(() => this.props.onConfirm());
  }
}

export default SettingsReset;