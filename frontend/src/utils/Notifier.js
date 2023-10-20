export default class Notifier {
  constructor(snackbar) {
    this.snackbar = snackbar;
  }

  internalNotify(message, severity) {
    this.snackbar(message, {variant: severity});
  }
  success = (message) => this.internalNotify(message, 'success');
  error = (message) => this.internalNotify(message, 'error');
  warning = (message) => this.internalNotify(message, 'warning');

  responseStatusIsOK = (response) =>
    (response.status >= 200 && response.status < 300);
  responseStatusIsNotOK = (response) =>
    (response.status >= 400 && response.status < 600);

  onRequestErrorResolvePromise = (callback, acc, rej) => (response) => {
    if (this.responseStatusIsNotOK(response)) {
      callback(); if (rej) rej();
    } else if (acc) acc();
    return response;
  };

  onRequestSuccessResolvePromise = (callback, acc, rej) => (response) => {
    if (this.responseStatusIsOK(response)) {
      callback(); if (acc) acc();
    } else if (rej) rej();
    return response;
  };

  onRequestError = (message) =>
    this.onRequestErrorResolvePromise(() => this.error(message));
  onRequestSuccess = (message) =>
    this.onRequestSuccessResolvePromise(() => this.success(message));

  connectionError = () => this.error('verificare la connessione');
}
