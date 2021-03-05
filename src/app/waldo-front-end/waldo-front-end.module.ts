import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";

import {ModelsListComponent} from './models-list/models-list.component';
import {FormsModule} from "@angular/forms";
import { ModelDetailsComponent } from './model-details/model-details.component';


@NgModule({
  declarations: [ModelsListComponent, ModelDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ModelsListComponent
  ]
})
export class WaldoFrontEndModule {
}
