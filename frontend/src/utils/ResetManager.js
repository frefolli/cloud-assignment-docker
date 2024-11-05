import {RESET_ENDPOINT} from './Protocol';

/**
  * */
  export default class ResetManager {
    doReset() {
      return new Promise((acc, rej) => {
        fetch(RESET_ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        })
          .then(acc)
          .catch(rej);
      });
    }
  }
