import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WaldoFrontEndModule} from "./waldo-front-end/waldo-front-end.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WaldoFrontEndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
