# Java Backend

Per informazioni "aggiornate" fare riferimento al file in formato openAPI in `backend/brew-day-backend/src/main/resources/openapi.yaml`

## API

| endpoint | method | description |
| --- | --- | --- |
| `/api/advice` | `GET` | get an advice on which recipe to execute |
| `/api/beer?name=name&&recipeID=recipeID` | `GET` | get list of beer IDs, eventually filter by name or recipeID|
| `/api/beers` | `POST` | execute recipe and add beer to stock |
| `/api/beers/:beerID` | `GET` | get stocked beer by ID |
| `/api/beers/:beerID` | `DELETE` | delete stocked beer |
| `/api/beers/:beerID` | `PUT` | update stocked beer details |
| `/api/beers/:beerID` | `POST` | add beer note |
| `/api/beers/:beerID/:noteID` | `GET` | get beer note by ID |
| `/api/beers/:beerID/:noteID` | `PUT` | update beer note|
| `/api/beers/:beerID/:noteID` | `DELETE` | delete beer note |
| `/api/inventory` | `GET` | get inventory ingredients |
| `/api/inventory` | `POST` | add inventory ingredient |
| `/api/inventory/:ingredientID` | `GET` | get inventory ingredient by ID |
| `/api/inventory/:ingredientID` | `PUT` | update inventory ingredient |
| `/api/inventory/:ingredientID` | `DELETE` | delete inventory ingredient |
| `/api/recipes?name=name` | `GET` | get list of recipe IDs, eventually filter by name |
| `/api/recipes` | `POST` | add recipe |
| `/api/recipes/:recipeID` | `GET` | get recipe by ID |
| `/api/recipes/:recipeID` | `PUT` | update recipe details |
| `/api/recipes/:recipeID` | `DELETE` | delete recipe |
| `/api/recipes/:recipeID` | `POST` | add recipe ingredient |
| `/api/recipes/:recipeID/:ingredientID` | `GET` | get recipe ingredient by ID |
| `/api/recipes/:recipeID/:ingredientID` | `PUT` | update recipe ingredient |
| `/api/recipes/:recipeID/:ingredientID` | `DELETE` | delete recipe ingredient |
| `/api/reset` | `POST` | reset database |
| `/api/settings` | `GET` | get all settings |
| `/api/settings` | `POST` | add setting |
| `/api/settings/:settingID` | `GET` | get setting by ID |
| `/api/settings/:settingID` | `PUT` | update setting |
| `/api/settings/:settingID` | `DELETE` | delete setting |
| `/api/shopping` | `POST` | update a list of inventory ingredient |
| `/api/shopping/:recipeID` | `GET` | get a shopping list of inventory ingredient |

### GET /api/advice

returns a json object like:

```json
{
  "recipeID": "recipeID",
  "quantity": "quantity"
}
```

### GET /api/beer?name=name&&recipeID=recipeID

returns a json object like:

```json
["id0", "id1", "id2"]
```

### POST /api/beer/

requires a json object like:

```json
{
  "name": "name",
  "recipeID":"recipeID"
}
```

put in beerID header the path of created resource

### GET /api/beer/:beerID

returns a json object like:

```json
{
  "beerID":"beerID",
  "name": "name",
  "recipeID":"recipeID",
  "notes": [{
  	"beerID":"beerID"
      	"noteID": "noteID",
	"noteType": "noteType",
	"description":"description"
  }]
}
```

### PUT /api/beer/:beerID

requires a json object like:

```json
{
  "name": "new name"
}
```

returns a json object like:

```json
{
  "beerID":"beerID",
  "name": "new name",
  "recipeID":"recipeID",
  "notes": [{
    	"noteID": "noteID",
	"noteType": "noteType",
	"description":"description"
  }]
}
```

### POST /api/beer/:beerID

requires a json object like:

```json
{
  "description": "description",
  "noteType": "noteType"
}
```

put in noteID header the path of created resource


### GET /api/beer/:beerID/:noteID

```json
{
  "beerID":"beerID",
  "noteID": "noteID",
  "noteType": "noteType",
  "description": "description"
}
```

### PUT /api/beer/:beerID/:noteID

requires a json object like:

```json
{
  "noteType": "noteType",
  "description": "description"
}
```

returns a json object like:

```json
{
  "beerID":"beerID",
  "noteID": "noteID",
  "noteType": "noteType",
  "description": "description"
}
```

### GET /api/inventory

get a json object like:

```json
[{
  "ingredientID": "ingredientID1",
  "name": "nome1",
  "quantity": 17.0
}, {
  "ingredientID": "ingredientID2",
  "name": "nome2",
  "quantity": "2.0"
}]
```

### POST /api/inventory

requires a json object like:

```json
{
  "name": "nome1",
  "quantity": "17.0"
}
```

### GET /api/inventory/:ingredientID

get a json object like:

```json
{
  "ingredientID": "ingredientID",
  "name": "nome1",
  "quantity": "17.0"
}
```

### PUT /api/inventory/:ingredientID

requires a json object like:

```json
{
  "quantity": "17.2"
}
```
get a json object like:

```json
[{
  "name": "nome1",
  "ingredientID": "ingredientID",
  "quantity": "17.2"
}]
```

### GET /api/recipes?name=name

returns a json object like:

```json
["id0", "id1", "id2"]
```

### POST /api/recipes/

requires a json object like:

```json
{
  "name": "name"
}
```

put in RecipeID header the path of created resource

### GET /api/recipes/:recipeID

returns a json object like:

```json
{
  "name": "name",
  "recipeID": "recipeID",
  "ingredients": [{
  	"name": "name",
	"ingredientID": "ingredientID",
	"quantity": "17.0"
  }]
}
```

### PUT /api/recipes/:recipeID

requires a json object like:

```json
{
  "name": "new name"
}
```

returns a json object like:

```json
{
  "name": "new name",
  "recipeID": "recipeID",
  "ingredients": [{
  	"name": "name",
	"ingredientID": "ingredientID",
	"quantity": "17.0"
  }]
}
```

### POST /api/recipes/:recipeID

requires a json object like:

```json
{
  "name": "name",
  "quantity": "17.0"
}
```

### GET /api/recipes/:recipeID/:ingredientID

```json
{
  "name": "name",
  "recipeID": "recipeID",
  "ingredientID": "ingredientID",
  "quantity": "17.0"
}
```

### PUT /api/recipes/:recipeID/:ingredientID

requires a json object like:

```json
{
  "quantity": "17.0"
}
```

returns a json object like:

```json
{
  "name": "name",
  "recipeID": "recipeID",
  "ingredientID": "ingredientID",
  "quantity": "17.0"
}
```

### GET /api/settings

get a json object like:

```json
[{
  "settingID": "Background",
  "value": "Background1"
}, {
  "settingID": "Color",
  "value": "Blue"
}]
```

### POST /api/settings

requires a json object like:

```json
{
  "settingID": "Color",
  "value": "Blue"
}
```

### GET /api/settings/:settingID

get a json object like:

```json
{
  "settingID": "settingID",
  "value": "Blue"
}
```

### PUT /api/settings/:settingID

requires a json object like:

```json
{
  "value": "blue"
}
```
get a json object like:

```json
[{
  "settingID": "settingID",
  "value": "Blue"
}]
```

### POST/api/shopping

requires a json object like:

```json
[{
  "name": "nome1",
  "quantity": "17.0"
}, {
  "name": "nome2",
  "quantity": "2.0"
}]
```

### GET /api/shopping/:recipeID

get a json object like:

```json
[{
  "ingredientID": "ingredientID1",
  "name": "nome1",
  "quantity": "17.0"
}, {
  "ingredientID": "ingredientID2",
  "name": "nome2",
  "quantity": "2.0"
}]
```
