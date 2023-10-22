# Processo richiesto (Github)

Per tenere traccia dell'attivita' e dello stato di avanzamento del progetto, e' necessario seguire le seguenti regole:

- Per ciascuna serie principale di attivita' di sviluppo, deve essere definita una milestone che le caratterizza.
- Per ogni attivita' di sviluppo, deve essere definita una issue che la descriva, all'interno del corrispondente milestone.
- La granularita' delle attivita' spetta ai team. Per i team piu' grandi e' meglio una piccola granularita' (unita' di lavoro possono essere implementazioni del metodo, documentazione del metodo/fornitura del contratto, unit test per metodi, ecc.).
- Prima di creare una nuova issue, gli utenti devono verificare se la stessa issue e' stata creato in precedenza (importante per i team di grandi dimensioni) per evitare la ridondanza del lavoro.
- Si raccomanda l'uso di branch per lavorare su soluzioni parziali o questioni piu' ampie.
- Tutti gli utenti devono assicurarsi che le loro soluzioni parziali non rompano il sistema (i test che prima superavano devono ancora passare, il progetto deve essere correttamente compilato, ecc.).

# Linee guida standard

| job | tool |
| --- | --- |
| Gantt | GanttProject |
| IDE | Eclipse JEE |
| Diagrams | Visual Paradigm |
| Build System | Maven |
| Test Coverage | Jacoco |
| Quality Assessment | Sonarqube |

# Glossario di progetto

| entry | description |
| --- | --- |
| birraio | un utente |
| equipaggiamento | bollitore, fermentatore, pipa da birra |
| capacita' | quantita' in litri che un equipaggiamento puo' supportare in una turnata |
| ingrediente | malto, luppolo, lievito, zucchero, acqua, additivi |
| ricetta | collezione di ingredienti con associata una quantita' |
| inventario | collezione di ingredienti che l'home brewer ha a disposizione |
| consiglio | ricetta che massimizza l'uso degli ingredienti nell'inventario |
| istanza di birra | anche chiamata `istanza di ricetta` nel testo, birra prodotta con una certa ricetta |

# Requisiti

## Requisiti funzionali

| entry | MoSCoW |
| --- | --- |
| il sistema deve permettere all'utente di mantenere, aggiornare, eliminare ricette | M |
| il sistema deve permettere all'utente di mantenere l'inventario | M |
| il sistema deve permettere all'utente di indicare che una ricetta e' stata eseguita e quindi aggiornare l'inventario di conseguenza | M |
| il sistema deve permettere all'utente di indicare che ha fatto la spesa e quindi aggiornare l'inventario di conseguenza | M |
| il sistema deve permettere all'utente di produrre la lista della spesa per gli ingredienti mancanti di una ricetta | M |
| il sistema deve permettere all'utente di generare un consiglio per la prossima birra | M |
| il sistema deve permettere all'utente di mantenere le istanze di una ricetta | M |
| il sistema deve permettere all'utente di aggiungere, aggiornare, eliminare note alle istanze di una birra | M |
| il sistema deve notificare l'utente quando mancano degli ingredienti per la prossima birra | M |

## Requisiti non funzionali

| entry | MoSCoW |
| --- | --- |
| il sistema deve mantenere le quantita' degli ingredienti nelle ricette (e nell'inventario) in termini di unita' assolute (anche diverse), in modo che sia piu' semplice calcolare i multipli | M |
| il sistema deve supportare le note normale e le note di sapore per le istanze di una ricetta  | M |
| il suggerimento della birra deve massimizzare l'uso di ingredienti e equipaggiamento | M |
| il sistema deve supportare la possibilita' di aggiungere immagini alle istanze di birra | C |
| si deve permettere di eliminare una ricetta che ha associate delle birre prodotte | M |

# Casi d'Uso

## Bare Bone

| nome | descrizione |
| --- | --- |
| aggiungiRicetta |  |
| modificaRicetta |  |
| eliminaRicetta |  |
| cercaRicetta |  |
| visualizzaRicetta |  |
| visualizzaInventario |  |
| aggiungiIngredienteAllInventario |  |
| modificaIngredienteNellInventario |  |
| eliminaIngredienteDallInventario |  |

## Dress Code

| nome | descrizione |
| --- | --- |
| eseguiRicetta |  |
| eliminaIstanzaDiBirra |  |
| aggiungiNotaAllIstanzaDiBirra |  |
| eliminaNotaDallIstanzaDiBirra |  |
| modificaNotaDellIstanzaDiBirra |  |

## Planning

| nome | descrizione |
| --- | --- |
| eseguiSpesa |  |
| indicaFuturaBirra |  |
| preparaListaDellaSpesa |  |
| suggeriscimiBirra |  |
| notificaIngredientiMancanti |  |
| modificaCapacitaEquipaggiamentoTotale |  |

## aggiungiRicetta

```
Il birraio inizia l'immissione di una nuova ricetta.
Il birraio inserisce il nome della nuova ricetta.
Il birraio può inserire una descrizione della ricetta.
import modificaRicetta
il sistema salva la ricetta
```

## modificaRicetta

```python
Il birraio inizia la modifica di una ricetta.
while:
  if opt1:
    inserisce il nome di un ingrediente
    inserisce la quantita' dell'ingrediente
  if opt2:
    individua l'ingrediente da rinominare
    inserisce il nuovo nome dell'ingrediente
  if opt3:
    individua un ingrediente
    inserisce la nuova quantita' dell'ingrediente
  if opt4:
    seleziona l'ingrediente da eliminare
  if opt5:
    inserisce il nuovo nome della ricetta
  if opt5:
    inserisce la nuova descrizione della ricetta
  sistema salva la ricetta
```