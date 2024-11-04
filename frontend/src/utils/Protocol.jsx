import React from 'react';
import {Cookie, Feedback, Warning} from '@mui/icons-material';
import Notifier from './Notifier';

export const BACKEND_SERVER = 'http://brewday-backend';
export const ADVICE_ENDPOINT = BACKEND_SERVER + '/api/advice';
export const BEERS_ENDPOINT = BACKEND_SERVER + '/api/beers';
export const SHOPPING_ENDPOINT = BACKEND_SERVER + '/api/shopping';
export const INVENTORY_ENDPOINT = BACKEND_SERVER + '/api/inventory';
export const RECIPES_ENDPOINT = BACKEND_SERVER + '/api/recipes';
export const RESET_ENDPOINT = BACKEND_SERVER + '/api/reset';
export const SETTINGS_ENDPOINT = BACKEND_SERVER + '/api/settings';

export const ADVICE_VIEW_TRIGGER = 'adviceReload=true';
export const ADVICE_VIEW_ESCAPE = 'adviceReload=false';
export const NEXT_RECIPE_VIEW_TRIGGER = 'nextRecipeReload=true';
export const NEXT_RECIPE_VIEW_ESCAPE = 'nextRecipeReload=false';
export const THEME_MANAGER_TRIGGER = 'themeReload=true';
export const THEME_MANAGER_ESCAPE = 'themeReload=false';
export const NAVBAR_THEME_MANAGER_TRIGGER = 'navbarReload=true';
export const NAVBAR_THEME_MANAGER_ESCAPE = 'navbarReload=false';
export const BACKGROUND_MANAGER_TRIGGER = 'backgroundReload=true';
export const BACKGROUND_MANAGER_ESCAPE = 'backgroundReload=false';

export const LAST_USED_THEME_LOCALSTORAGE_KEY = 'lastUsedTheme';
export const LAST_USED_BACKGROUND_LOCALSTORAGE_KEY = 'lastUsedBackground';

export const DEFAULT_THEME = 'default';
export const DEFAULT_BACKGROUND = 'default';

export const INGREDIENT_NAME_OPTIONS = [
  'acqua', 'additivi', 'lievito', 'luppoli', 'malto', 'zuccheri'];

export const NOTE_TYPE_OPTIONS = ['generic', 'taste', 'problem'];
export const DEFAULT_NOTE_TYPE = 'generic';
export const NOTE_TYPE_ICONS = {
  generic: <Feedback/>,
  taste: <Cookie fontSize="large" sx={{verticalAlign: 'middle'}}/>,
  problem: <Warning/>,
};
export const FAKE_NOTIFIER = new Notifier(() => {});
export const isValidPositiveQuantity = (value) => (Number(value) > 0);
export const isNotValidPositiveQuantity = (value) =>
  (! isValidPositiveQuantity(value));
