# WaldoApp

## TO DO

- Motivare abbandono provider WebGL+Leaflet
- Aggiungi Modello:
  - ~~inserire funzione in risposta al tasto si~~
  - ~~inserire funzione in risposta al tasto no (??)~~
  - ~~implementare funzione loadModel nel servizio per i modelli~~:
    - ~~filtrare l'array url addizionali da elementi vuoti~~
    - ~~chiedere al server gli uuid~~
    - ~~generare un uuid unico~~
      - ~~generare dati non inseriti dall'utente~~:
      - ~~data caricamento~~
      - ~~data modifica~~
      - ~~provider supportati~~
        - ~~regole hard-coded in una classe~~
        - ~~messaggio di errore tramite snackbar per formato non supportato~~
    - ~~fare richiesta al server~~
  - ~~messaggio di notifica tramite snackbar~~
    - ~~successo~~
    - ~~errore~~
  - ~~redirect al completamento di un'operazione~~
  - ~~relazione e presentazione~~
- Ricerca Modello:
  - ~~getModels~~:
  - ~~getModel~~
  - ~~searchByName~~
- Visualizza Modello
  - Rendering dei Modelli:
    - funzione di utilità che crea il provider a partire dall'id ottenuto dal server (defaultProvider)
      - implementare in ProviderUtils
    - Provider:
      - Progettazione interfaccia Provider
        - renderModel per renderizzare il modello
        - renderPointer per renderizzare un mark
        - inserire un click handler per i mark, che mostrano il messaggio 
      - WebGL
        - ~~Fecth dei materiali con file .mtl esplicito~~
        - ~~provare a convertire le IIFE~~
        - test dell'import delle classi
      - Three.js
        - test dell'import delle classi
      - A-Frame
        - vedere come inserire tag nel template html tramite typescript (vedere [innerHTML])
          https://www.digitalocean.com/community/tutorials/angular-innerhtml-binding-angular
- Modifica Modello
  - rendere il titolo della pagina (i.e. nome modello) modificabile
- Rimuovi Modello
  - ~~inserire funzione in risposta al tasto si~~
  - ~~inserire funzione in risposta al tasto no (??)~~
  - ~~implementare funzione deleteModel nel servizio per i modelli.~~
  - ~~messaggio di notifica tramite snackbar~~
  - ~~tests (200, 404, No Server)~~
  - ~~relazione e presentazione~~
  - ~~testare delete cascade su json-server~~
  - la rimozione del modello causa la rimozione dei mark ad esso associati
- Inserimento Marcatura
  - addPointer per inserire un nuovo mark (collabora con addPointer del PointersService)
  - chiamare renderPointer per inserire il mark visivamente
- Ricerca Marcature
  - getPointers(modelId) per ottenere i mark di un modello
  - getPointer(id) per ottenere un singolo mark
- Consultazione Info Marcatura
  - mostrare il messaggio della marcartura come risposta al click su una marcatura
  - attivare i pulsanti per la modifica della marcatura (edit message o delete pointer) come risposta al click su
    marcatura
- Modifica Marcatura
- Rimuovi Marcatura
  - vedere come eliminare la sferetta dalla scena:
    - A-Frame
    - Three.js
  - removePointer per rimuovere un mark (collabora con removePointer del PointersService)
- Documentazione
  - mettere nella documentazione una pagina dove vengono spiegati i vari provider
  - Ridefinire la sezione API:
    - relazione
    - presentazione


