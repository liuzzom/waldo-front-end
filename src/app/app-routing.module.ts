import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelsListComponent} from "./waldo-front-end/models-list/models-list.component";
import {AddModelFormComponent} from "./waldo-front-end/add-model-form/add-model-form.component";
import {ModelDetailsComponent} from "./waldo-front-end/model-details/model-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/models', pathMatch: 'full'},
  {path: 'models', component: ModelsListComponent},
  {path: 'add-model', component: AddModelFormComponent},
  {path: 'model-details', component:ModelDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
