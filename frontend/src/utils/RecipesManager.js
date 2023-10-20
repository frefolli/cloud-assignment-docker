import {RECIPES_ENDPOINT} from './Protocol';

export default class RecipesManager {
    getRecipeList(search) {
        return new Promise((acc, rej) => {
            let url = RECIPES_ENDPOINT;
            if (search !== undefined && search.name !== undefined)
                url += `?name=${search.name}`;
            fetch(url)
            .then(response => response.json())
            .then(acc).catch(rej);
        })
    }
    
    getRecipe(recipeID) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}`)
            .then(response => response.json())
            .then(acc).catch(rej);
        })
    }
    
    postRecipe(recipe) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            }).
            then(acc).catch(rej);
        });
    }
    
    putRecipe(recipeID, recipe) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            }).
            then(acc).catch(rej);
        });
    }
    
    deleteRecipe(recipeID) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(acc)
            .catch(rej);
        });
    }
    
    postIngredient(recipeID, ingredient) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredient)
            }).
            then(acc).catch(rej);
        });
    }
    
    putIngredient(recipeID, id, ingredient) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredient)
            }).
            then(acc).catch(rej);
        });
    }
    
    deleteIngredient(recipeID, id) {
        return new Promise((acc, rej) => {
            fetch(RECIPES_ENDPOINT + `/${recipeID}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(acc)
            .catch(rej);
        });
    }
}
