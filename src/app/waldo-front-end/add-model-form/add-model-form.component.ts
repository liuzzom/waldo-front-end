import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  addMetadata: boolean = false;

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

  get MTLModelSource(){
    return this.addModelForm.get('MTLModelSource');
  }

  get additionalSources(){
    return this.addModelForm.get('additionalSources') as FormArray
  }

  get modelWidth(){
    return this.addModelForm.get('modelWidth');
  }

  get modelHeight(){
    return this.addModelForm.get('modelHeight');
  }
  // -------------------- Init --------------------

  ngOnInit(): void {
    // Define the model form and its fields (with validators)
    this.addModelForm = this.fb.group({
      modelName: ['', [Validators.required, Validators.minLength(3)]],
      modelDescription: [''],
      modelFormat: ['', [Validators.required]],
      modelSource: ['', Validators.required],
      MTLModelSource: [''],
      additionalSources: this.fb.array([]),
      modelWidth: ['', Validators.pattern('\\d+')],
      modelHeight: ['', Validators.pattern('\\d+')]
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
    let newModelName: string = formData.modelName.trim();
    let newModelDescription: string = "There's no description yet";
    let newModelSources: string[] = [];
    let usedIds: string[] = [];

    if(formData.modelDescription.trim() !== "") newModelDescription = formData.modelDescription.trim();

    // Set sources array
    newModelSources.push(formData.modelSource.trim());
    if (formData.MTLModelSource.trim()) newModelSources.push(formData.MTLModelSource.trim());
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
      description: newModelDescription,
      uploaded: newModelUploaded,
      lastModified: newModelLastModified,
      supportedProviders: newModelSupportedProviders,
      defaultProvider: newModelDefaultProvider
    }

    // put metadata, if any
    let metadata: any = {};
    if (formData.modelWidth !== "") metadata.width = formData.modelWidth;
    if (formData.modelHeight !== "") metadata.height = formData.modelHeight;
    if (Object.keys(metadata).length > 0) newModel.metadata = metadata;

    return newModel;
  }

  // -------------------- Handlers --------------------

  goBack(){
    this.location.back();
  }

  goHome(){
    this.router.navigate(['models']);
  }

  toggleMetadata(){
    this.addMetadata = !this.addMetadata;
    this.modelHeight.setValue("");
    this.modelWidth.setValue("");
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

  /** Handle the Format select change */
  onFormatSelect(value: string) {
    this.addModelForm.setControl('additionalSources', this.fb.array([]));

    if (value === "png"){

      console.log("png selected");
      this.addMetadata = true;

      this.addModelForm.setControl('modelWidth',
        new FormControl('', [Validators.required, Validators.pattern('\\d+')]));
      this.addModelForm.setControl('modelHeight',
        new FormControl('', [Validators.required, Validators.pattern('\\d+')]));

      this.addModelForm.setControl('modelSource',
        new FormControl('', [Validators.required, Validators.pattern('^.+\\.png$')]));
      this.addModelForm.setControl('MTLModelSource', new FormControl('', []));
    } else if (value === "obj") {

      console.log("obj selected");
      this.addMetadata = false;
      this.addModelForm.setControl('modelWidth',
        new FormControl('', [Validators.pattern('\\d+')]));
      this.addModelForm.setControl('modelHeight',
        new FormControl('', [Validators.pattern('\\d+')]));

      this.addModelForm.setControl('modelSource',
        new FormControl('', [Validators.required, Validators.pattern('^.+\\.obj$')]));
      this.addModelForm.setControl('MTLModelSource',
        new FormControl('', [Validators.required, Validators.pattern('^.+\\.mtl$')]));
    } else {

      console.log("gltf selected");
      this.addMetadata = false;
      this.addModelForm.setControl('modelWidth',
        new FormControl('', [Validators.pattern('\\d+')]));
      this.addModelForm.setControl('modelHeight',
        new FormControl('', [Validators.pattern('\\d+')]));

      this.addModelForm.setControl('modelSource',
        new FormControl('', [Validators.required, Validators.pattern('^.+\\.gltf$')]));
      this.addModelForm.setControl('MTLModelSource', new FormControl('', []));
    }
  }
}
