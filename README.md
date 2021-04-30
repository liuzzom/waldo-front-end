# WaldoApp

## TO DO

### Documentazione

- Motivare abbandono provider WebGL+Leaflet
- mettere nella documentazione una pagina dove vengono spiegati i vari provider
- Ridefinire la sezione API:
  - relazione
  - presentazione
- Spiegare procedura d'installazione A-Frame
  - Polyfill.ts
  - CUSTOM_ELEMENTS_SCHEMA
- Motivare utilizzo di cascade durante la cancellazione di un modello per trasparenza 
- Fare delle slide su come viene gestito il render del modello nei vari provider
- Spiegare il tentativo fatto con leaflet e gli impedimenti trovati (pare non si sposi bene con ambienti "dinamici")
  - questione latitudine/longitudine

### Implementazione

- ~~Inserimento Modello~~:
- ~~Ricerca Modello~~:
- Visualizza Modello
  - Vedere Tabella
- ~~Modifica Modello (i.e. modifica del nome e del provider di default)~~
- ~~Rimuovi Modello~~
- Inserimento Marcatura
  - addPointer per inserire un nuovo mark 
  - chiamare renderPointer per inserire il mark visivamente
- Ricerca Marcature
  - getPointers(modelId) per ottenere i mark di un modello
  - getPointer(id) per ottenere un singolo mark
- Consultazione Info Marcatura
  - mostrare il messaggio della marcatura come risposta al click su una marcatura
  - attivare i pulsanti per la modifica della marcatura (edit message o delete pointer) come risposta al click su marcatura
- Modifica Marcatura
  - Modifica del messaggio
- Rimuovi Marcatura
  - vedere come eliminare la sferetta dalla scena:
    - A-Frame
    - Three.js
  - removePointer per rimuovere un mark (collabora con removePointer del PointersService)

|                    | ins mod | ric mod | vis mod | edit mod | rim mod | ins poi | info poi | ric poi | mod poi | rim poi |
| ------------------ | ------- | ------- | ------- | -------- | ------- | ------- | -------- | ------- | ------- | ------- |
| 2d view            | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| 2d mark            | **X**   | **X**   | **X**   | **X**    | **X**   | **X**   | **X**    | **/**   | **X**   | **X**   |
| three js obj view  | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| three js obj nav   | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| three js obj mark  | **X**   | **X**   | **X**   | **X**    | **X**   |         |          |         |         |         |
| a-frame obj view   | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| a-frame obj nav    | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| a-frame obj mark   | **X**   | **X**   | **X**   | **X**    | **X**   |         |          |         |         |         |
| three js gltf view | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| three js gltf nav  | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| three js gltf mark | **X**   | **X**   | **X**   | **X**    | **X**   |         |          |         |         |         |
| a-frame gltf view  | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| a-frame gltf nav   | **X**   | **X**   | **X**   | **X**    | **X**   | **/**   | **/**    | **/**   | **/**   | **/**   |
| a-frame gltf mark  | **X**   | **X**   | **X**   | **X**    | **X**   |         |          |         |         |         |
