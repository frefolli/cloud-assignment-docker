import {BEERS_ENDPOINT} from './Protocol';

export default class BeersManager {
    getBeerList(search) {
        return new Promise((acc, rej) => {
            let url = BEERS_ENDPOINT;
            if (search !== undefined) {
                url += `?`;
                if (search.name !== "")
                    url += `&&name=${search.name}`;
                if (search.recipe !== "")
                    url += `&&recipeID=${search.recipe}`;
            }
            fetch(url)
            .then(response => response.json())
            .then(data => acc(data)).catch(rej);
        })
    }
    
    getBeer(beerID) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT + `/${beerID}`)
            .then(response => response.json())
            .then(data => acc(data)).catch(rej);
        })
    }
    
    postBeer(beer) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beer)
            }).
            then(data => acc(data)).catch(rej);
        });
    }
    
    putBeer(beerID, beer) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beer)
            }).
            then(data => acc(data)).catch(rej);
        });
    }
    
    deleteBeer(beerID) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT + `/${beerID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(data => acc(data))
            .catch(rej);
        });
    }
    
    postNote(beerID, note) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT + `/${beerID}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            }).
            then(data => acc(data)).catch(rej);
        });
    }
    
    putNote(beerID, id, note) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT + `${beerID}/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            }).
            then(data => acc(data)).catch(rej);
        });
    }
    
    deleteNote(beerID, id) {
        return new Promise((acc, rej) => {
            fetch(BEERS_ENDPOINT + `/${beerID}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(data => acc(data))
            .catch(rej);
        });
    }
}
