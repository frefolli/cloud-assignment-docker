import {ADVICE_ENDPOINT} from './Protocol';

export default class AdviceManager {
  getAdvice() {
    return new Promise((acc, rej) => {
      fetch(ADVICE_ENDPOINT, {mode: 'cors'})
        .then((res) => res.json())
        .then((data) => acc(data))
        .catch((err) => rej(err));
    });
  }
}
