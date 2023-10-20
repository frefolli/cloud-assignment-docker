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
                    'Content-Type': 'application/json'
                },
            })
            .then(acc)
            .catch(rej);
        });
    }
}
