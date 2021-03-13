# WaldoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TO DO
- rimuovi modello:
    - ~~inserire funzione in risposta al tasto si~~
    - ~~inserire funzione in risposta al tasto no (??)~~
    - ~~implementare funzione deleteModel nel servizio per i modelli.~~
    - ~~messaggio di notifica tramite snackbar~~
    - ~~tests (200, 404, No Server)~~
    - relazione e presentazione
- aggiungi modello:
    - ~~inserire funzione in risposta al tasto si~~
    - ~~inserire funzione in risposta al tasto no (??)~~
    - implementare funzione loadModel nel servizio per i modelli.
        - ~~filtrare l'array url addizionali da elementi vuoti~~
        - ~~chiedere al server gli uuid~~
        - ~~generare un uuid unico~~
        - generare dati non inseriti dall'utente:
            - ~~data caricamento~~
            - ~~data modifica~~
            - provider supportati
                - ~~regole hard-coded in una classe~~
                - ~~messaggio di errore tramite snackbar per formato non supportato~~
        - ~~fare richiesta al server~~
    - ~~messaggio di notifica tramite snackbar~~
        - ~~successo~~
        - ~~errore~~
    - ~~redirect al completamento di un'operazione~~
    - relazione e presentazione
- getModels (metodo service per ottenere i modelli dal back-end e mostrarli nella pagina con l'elenco)
    - Inserire il campo per la ricerca e il filtraggio (vedere tour of heroes)
    - implementare ricerca per nome nel servizio per i modelli
- getModel (metodo service per ottenere un singolo modello dal back-end)
- mostrare il messaggio della marcartura come risposta al click su una marcatura
- attivare i pulsanti per la modifica della marcatura (edit message o delete pointer) come risposta al click su marcatura
- mettere nella documentazione una pagina dove vengono spiegati 

