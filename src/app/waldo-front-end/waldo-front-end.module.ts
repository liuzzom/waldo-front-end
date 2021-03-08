import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";

import {ModelsListComponent} from './models-list/models-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModelDetailsComponent} from './model-details/model-details.component';
import {WaldoEntryPointComponent} from './waldo-entry-point/waldo-entry-point.component';
import {RouterModule} from "@angular/router";
import { DeleteModelDialogComponent } from './delete-model-dialog/delete-model-dialog.component';
import { AddModelFormComponent } from './add-model-form/add-model-form.component';
import { DeletePointerDialogComponent } from './delete-pointer-dialog/delete-pointer-dialog.component';


@NgModule({
  declarations: [ModelsListComponent, ModelDetailsComponent, WaldoEntryPointComponent, DeleteModelDialogComponent, AddModelFormComponent, DeletePointerDialogComponent],
  entryComponents: [
    DeleteModelDialogComponent,
    DeletePointerDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ModelsListComponent,
    WaldoEntryPointComponent
  ]
})
export class WaldoFrontEndModule {
}
