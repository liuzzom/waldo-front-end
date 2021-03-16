import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {ModelsService} from "../services/models.service";
import {v4 as uuidv4} from 'uuid';
import {ProviderUtils} from "../providers/provider-utils.";
import {Model} from "../domain-model/Model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
    this.addModelForm = this.fb.group({
      modelName: ['', [Validators.required, Validators.minLength(5)]],
      modelSource: ['', Validators.required],
      additionalSources: this.fb.array([])
    })
  }

  // -------------------- Methods --------------------

  addAdditionalSource(){
    this.additionalSources.push(this.fb.control(''))
  }

  private async getModelsIds(): Promise<string[]>{
    let ids: string[] = [];
    const models = await this.modelsService.getModels().toPromise();
    for(let model of models){
      ids.push(model.id);
    }

    return ids;
  }

  private async prepareModel(formData) {
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
    let providers = ProviderUtils.getProvidersByFormat(newModelFormat);
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

  async onSubmit() {
    let formData = this.addModelForm.value;
    let newModel = await this.prepareModel(formData);

    this.modelsService.loadModel(newModel).subscribe(res => {
      if(res){
        let successSnackBar = this.snackBar.open('Model Loaded', 'Ok', {duration: 2000});

        successSnackBar.afterDismissed().subscribe(() => {
          console.log('Success Bar was dismissed');
          this.goHome();
        });

        successSnackBar.onAction().subscribe(() => {
          console.log("The Success Bar action was triggered");
        });
      } else {
        this.snackBar.open('Something went wrong, Check your entries or contact support', 'Ok', {duration: 2000});
      }
    });
  }
}
