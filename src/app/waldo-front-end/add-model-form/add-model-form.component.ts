import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {ModelsService} from "../services/models.service";
import {v4 as uuidv4} from 'uuid';
import {Model} from "../domain-model/Model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ProvidersService} from "../services/providers.service";

@Component({
  selector: 'app-add-model-form',
  templateUrl: './add-model-form.component.html',
  styleUrls: ['./add-model-form.component.css']
})
export class AddModelFormComponent implements OnInit {
  addModelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private modelsService: ModelsService,
    private providersService: ProvidersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  // -------------------- Getters --------------------

  get modelName(){
    return this.addModelForm.get('modelName');
  }

  get modelSource(){
    return this.addModelForm.get('modelSource');
  }

  get additionalSources(){
    return this.addModelForm.get('additionalSources') as FormArray
  }

  // -------------------- Init --------------------

  ngOnInit(): void {
    // Define the model form and its fields (with validators)
    this.addModelForm = this.fb.group({
      modelName: ['', [Validators.required, Validators.minLength(3)]],
      modelSource: ['', Validators.required],
      additionalSources: this.fb.array([])
    })
  }

  // -------------------- Methods --------------------

  /** Insert an additional source field into the form */
  addAdditionalSource(){
    this.additionalSources.push(this.fb.control(''))
  }

  /** Get models id from the back-end */
  private async getModelsIds(): Promise<string[]>{
    let ids: string[] = [];
    const models = await this.modelsService.getModels().toPromise();
    for(let model of models){
      ids.push(model.id);
    }

    return ids;
  }

  /** Get providers that supports a given format, using the back-end via services */
  private async getProvidersByFormat(format: string) : Promise<any>{
    let providersIds: any = null;

    const formats = await this.providersService.getFormats().toPromise();
    for (let formatObject of formats){
      if(formatObject.format === format){
        providersIds = {};
        providersIds.supported = formatObject.supported;
        providersIds.default = formatObject.default;
      }
    }

    return providersIds;
  }

  /** Prepares the model data to send to the back-end  */
  private async prepareModel(formData): Promise<Model> {
    let newModelName = formData.modelName;
    let newModelSources = [];
    let usedIds: string[] = [];

    // Set sources array
    newModelSources.push(formData.modelSource);
    for (let source of formData.additionalSources) {
      source = source.trim();
      if (source) {
        newModelSources.push(source);
      }
    }

    // set id
    let newModelId = uuidv4();
    usedIds = await this.getModelsIds();
    while (usedIds.includes(newModelId)) {
      console.warn("duplicated id");
      newModelId = uuidv4();
    }

    // set dates
    let newModelUploaded = new Date().toJSON();
    let newModelLastModified = newModelUploaded;

    // set supported providers and set the default one
    let newModelFormat = newModelSources[0].split('.')[newModelSources[0].split('.').length -1];
    let providers = await this.getProvidersByFormat(newModelFormat);
    if (! providers){
      this.snackBar.open("Error in source format. Check your entries or contact support", "Ok", {duration: 2000});
      return undefined;
    }
    let newModelSupportedProviders = providers.supported;
    let newModelDefaultProvider = providers.default;

    // create the model
    let newModel: Model = {
      id: newModelId,
      name: newModelName,
      sources: newModelSources,
      uploaded: newModelUploaded,
      lastModified: newModelLastModified,
      supportedProviders: newModelSupportedProviders,
      defaultProvider: newModelDefaultProvider
    }

    return newModel;
  }

  // -------------------- Handlers --------------------

  goBack(){
    this.location.back();
  }

  goHome(){
    this.router.navigate(['models']);
  }

  /** Handle the Submit event*/
  async onSubmit() {
    let formData = this.addModelForm.value;
    let newModel = await this.prepareModel(formData);

    // Load the new model into the back-end
    this.modelsService.loadModel(newModel).subscribe(res => {
      if(res){
        let successSnackBar = this.snackBar.open('Model Loaded', 'Ok', {duration: 2000});

        successSnackBar.afterDismissed().subscribe(() => {
          this.goHome();
        });

        successSnackBar.onAction().subscribe(() => {});
      } else {
        this.snackBar.open('Something went wrong, Check your entries or contact support', 'Ok', {duration: 2000});
      }
    });
  }
}
