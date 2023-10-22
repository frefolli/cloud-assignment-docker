import {SETTINGS_ENDPOINT} from './Protocol';

export default class SettingsManager {
  getSettings() {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT)
          .then((response) => response.json())
          .then((data) => acc(data))
          .catch(rej);
    });
  }

  getSetting(settingID) {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT+`/${settingID}`)
          .then((response) => response.json())
          .then((data) => acc(data))
          .catch(rej);
    });
  }

  putSetting(settingID, newValue) {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT+`/${settingID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: newValue}),
      })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error();
            }
          })
          .then(acc)
          .catch(() => {
            this.postSetting(settingID, newValue)
                .then(acc).catch(rej);
          });
    });
  }

  postSetting(settingID, newValue) {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({settingID: settingID, value: newValue}),
      })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error();
            }
          })
          .then(acc).catch(rej);
    });
  }
}
