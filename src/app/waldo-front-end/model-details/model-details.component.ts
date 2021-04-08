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
import {Provider} from "../domain-model/Provider";
import {PointersService} from "../services/pointers.service";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  model: Model = this.emptyModel();

  editModelMode = false;
  editPointerMode = false;
  pointerTrigger = false;

  pointerSupport: boolean;
  selectedProvider: string;
  provider: Provider = null;

  oldPointerMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelsService: ModelsService,
    private providersService: ProvidersService,
    private pointersService: PointersService,
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
  }

  activatePointerTrigger(){
    this.pointerTrigger = true;
    this.provider.pointerTrigger = true;
  }

  deactivatePointerTrigger() {
    this.pointerTrigger = false;
    this.provider.pointerTrigger = false;
  }

  startEditPointerMode(value: string) {
    this.oldPointerMessage = value;
    console.log(this.oldPointerMessage);

    this.toggleEditPointerMode(true);
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

      const testId = "34f51504-8326-421c-b0f1-383ebe88fa93";

      this.providersService.getProvider(this.model.defaultProvider).subscribe(providerInfo => {
        this.provider = ProviderUtils.createProvider(providerInfo);

        this.provider.providerFeatures.includes('mark') ? this.pointerSupport = true : this.pointerSupport = false;
        console.log(`Provider used: ${this.provider.name}`);

        if(this.pointerSupport){
          // Pass the pointer service to the provider
          // TODO: this is NOT the best solution, try to make a cleaner work
          this.provider.setPointerService(this.pointersService);
        }

        this.provider.renderModel(this.model);
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

    if(newData.name === undefined && newData.defaultProvider === undefined){
      console.log('Nothing to update');
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

  editPointerMessage(newMessage: string) {
    if (newMessage === this.oldPointerMessage) {
      console.log('messsaggio non va aggiornato');
      this.toggleEditPointerMode(false);
      location.reload();
      return;
    }

    console.log('messsaggio da aggiornare');
    // edit the pointer message into the back-end
    this.pointersService.editPointerMessage(this.provider.selectedPointerId, newMessage).subscribe(res => console.log(res))
    this.toggleEditPointerMode(false);
    location.reload();
  }

  undo() {
    this.toggleEditPointerMode(false);
    location.reload();
  }
}
