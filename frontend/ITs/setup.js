import "isomorphic-fetch";
var oldFetch = global.fetch;
global.fetch = (url, opts) => oldFetch("http://localhost:8080" + url, opts);

// TESTED:
// - ResetManager
// - SettingsManager
// - RecipesManager
// - BeersManager
// - ShoppingManager
