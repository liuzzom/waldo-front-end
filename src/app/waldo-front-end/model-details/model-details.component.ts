import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {DeletePointerDialogComponent} from "../delete-pointer-dialog/delete-pointer-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";
import {ProviderUtils} from "../providers/provider-utils";
import {ProvidersService} from "../services/providers.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  model: Model = this.emptyModel();
  editModelMode = false;
  editPointerMode = false;
  pointerSupport: boolean;
  selectedProvider: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelsService: ModelsService,
    private providersService: ProvidersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.renderModel();
  }

  // ----- Handler Section ----- \\

  toggleEditModelMode(edit: boolean) {
    edit ? this.editModelMode = true : this.editModelMode = false;
  }

  toggleEditPointerMode(edit: boolean) {
    edit ? this.editPointerMode = true : this.editPointerMode = false;
    console.log(this.editPointerMode);
  }

  // ----- Method Section ----- \\

  // Open the dialog for deleting a Pointer
  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeletePointerDialogComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result: ${result}`);
    })
  }

  // Go back into the home page
  goBack() {
    this.location.back();
  }

  // Render the model into the rendering area
  renderModel(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.modelsService.getModel(id).subscribe(model => {
      this.model = model;
      this.selectedProvider = model.defaultProvider;
      // console.log('supported Prov: ' + this.model.supportedProviders)

      const testId = "34f51504-8326-421c-b0f1-383ebe88fa93";

      this.providersService.getProvider(this.model.defaultProvider).subscribe(providerInfo => {
        const provider = ProviderUtils.createProvider(providerInfo);

        provider.providerFeatures.includes('mark') ? this.pointerSupport = true : this.pointerSupport = false;
        console.log(provider.name);
        // console.log(this.pointerSupport);

        provider.renderModel(this.model);
      });
    });
  }

  // Create an empty model, used for page initialization
  emptyModel(): Model {
    return {
      id: '',
      name: '',
      sources: [],
      uploaded: '',
      lastModified: '',
      supportedProviders: [],
      defaultProvider: ''
    }
  }

  // ----- Storage Section ----- \\

  // Save edited model into the back-end (via services)
  editModel(editedName: string) {
    let newData: any = {};

    // Build new data
    newData.id = this.model.id;
    if(editedName !== this.model.name) newData.name = editedName;
    if(this.selectedProvider !== this.model.defaultProvider) newData.defaultProvider = this.selectedProvider;
    console.log(newData);

    if(newData.name === undefined && newData.defaultProvider === undefined){
      console.log('nothing to update');
      this.toggleEditModelMode(false);
      return;
    }

    // Make a request to te server and handle the results
    this.modelsService.editModel(newData).subscribe(res => {
      if(res){
        // Successful Edit
        this.toggleEditModelMode(false);
        let successSnackBar = this.snackBar.open('Model Edited', 'Ok', {duration: 2000});
        successSnackBar.afterDismissed().subscribe(() => {
          location.reload();
        });

        successSnackBar.onAction().subscribe(() => {});
      } else {
        // Error on Edit
        let failSnackBar = this.snackBar.open('Something Went Wrong', 'Ok', {duration: 2000});
        failSnackBar.afterDismissed().subscribe(() => {
          location.reload();
        });

        failSnackBar.onAction().subscribe(() => {});
      }
    });
  }
}
