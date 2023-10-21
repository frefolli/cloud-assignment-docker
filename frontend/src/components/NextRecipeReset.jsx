import React, {Component} from 'react';
import MButton from '../components/MButton';
import {FAKE_NOTIFIER} from '../utils/Protocol';
import SettingsManager from '../utils/SettingsManager';

/**
 * This component is responsible for resetting the next recipe settings.
 *
 * @class NextRecipeReset
 *
 * @param {Object} props - The component's properties.
 * @param {Notifier} props.notifier - An optional notifier for displaying notifications (default: FAKE_NOTIFIER).
 * @param {function} props.onConfirm - A function to be called after resetting the next recipe settings.
 *
 * @returns {JSX.Element} The NextRecipeReset component for resetting the next recipe settings.
 *
 * @example
 * // Example usage of the NextRecipeReset component
 * <NextRecipeReset notifier={customNotifier} onConfirm={handleConfirm} />
 */

class NextRecipeReset extends Component {
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
    this.settingsManager = new SettingsManager();
  }

  render() {
    return (
      <div>
        <center>
          <p>Sei sicuro di voler rimuovere la ricetta?</p>
          <MButton text="Conferma" onClick={this.resetNextRecipeSettings} />
        </center>
      </div>
    );
  }

  resetNextRecipeSettings = () => {
    this.settingsManager.putSetting('nextRecipeID', '')
        .then(() => this.settingsManager.putSetting('nextRecipeQuantity', '0'))
        .then(() => this.notifier.success('programmazione cancellata con successo'))
        .then(() => this.props.onConfirm())
        .catch(() => this.notifier.error('impossibile cancellare la programmazione'));
  };
}

export default NextRecipeReset;
