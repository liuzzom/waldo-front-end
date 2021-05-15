import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";

import {ModelsListComponent} from './models-list/models-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModelDetailsComponent} from './model-details/model-details.component';
import {WaldoEntryPointComponent} from './waldo-entry-point/waldo-entry-point.component';
import {RouterModule} from "@angular/router";
import {DeleteModelDialogComponent} from './delete-model-dialog/delete-model-dialog.component';
import {AddModelFormComponent} from './add-model-form/add-model-form.component';
import {DeletePointerDialogComponent} from './delete-pointer-dialog/delete-pointer-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {InfoComponent} from './info/info.component';


@NgModule({
  declarations: [ModelsListComponent, ModelDetailsComponent, WaldoEntryPointComponent, DeleteModelDialogComponent, AddModelFormComponent, DeletePointerDialogComponent, InfoComponent],
  entryComponents: [
    DeleteModelDialogComponent,
    DeletePointerDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ModelsListComponent,
    WaldoEntryPointComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WaldoFrontEndModule {
}
