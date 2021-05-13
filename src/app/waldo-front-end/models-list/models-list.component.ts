import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteModelDialogComponent} from "../delete-model-dialog/delete-model-dialog.component";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Provider} from "../domain-model/Provider";
import {ProvidersService} from "../services/providers.service";

@Component({
  selector: 'app-modules-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {
  models: Model[] = [];
  filteredModels: Model[] = [];
  providers: Provider[] = [];

  // ----- Constructor ----- \\
  constructor(
    public dialog: MatDialog,
    private modelsService: ModelsService,
    private providersService: ProvidersService,
    private snackBar: MatSnackBar
  ) {
  }

  // ----- Init ----- \\
  ngOnInit(): void {
    this.getModels();
    this.getProviders();
  }

  // ----- Dialog ----- \\
  openDeleteDialog(model) {
    let dialogRef = this.dialog.open(DeleteModelDialogComponent, {
      data: {
        name: model.name,
        id: model.id
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") this.deleteModel(model);
    });
  }

  // ----- Feedback ----- \\
  openSnackBar(message: string, action: string): void {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {

    })
  }

  // ----- Methods ----- \\

  /** Get Models from back-end via services*/
  private getModels(): void {
    this.modelsService.getModels()
      .subscribe(models => {
        this.models = models;
        this.filteredModels = this.models;
      });
  }

  /** Get Providers from back-end via services*/
  private getProviders(): void {
    this.providersService.getProviders().subscribe(providers => {
      this.providers = providers;
    })
  }

  /** Send a DELETE request to beck-end via service */
  private deleteModel(model: Model): void {
    this.modelsService.deleteModel(model).subscribe(res => {
      if (res) {
        this.models = this.models.filter(m => m !== model);
        this.filteredModels = this.models;
        this.openSnackBar('Model deleted', 'Ok');
      } else {
        this.openSnackBar('Failed to delete the model', 'OK');
      }
    });
  }

  /** Search a Model by name */
  searchModel(name: string) {
    // with an empty name, do some kind of "refresh"
    if (!name.trim()) {
      this.getModels();

      let searchBox = <any>document.getElementById('search-box');
      searchBox.value = "";

      return;
    }

    // filter model list shown on the template
    this.filteredModels = this.models.filter(model => model.name.toLowerCase().includes(name.trim().toLowerCase()));
  }

  // Get Provider Info by its ID
  getProvider(providerId: string) {
    let provider = this.providers.filter(provider => {
      return provider.id === providerId
    });

    if (provider.length !== 0) return provider[0];
  }

  // Handle changes in Current Provider select
  changeCurrentProvider(model: Model, providerId: string) {
    let newData: any = {}

    // prepare data for edit
    newData.id = model.id;
    newData.defaultProvider = providerId;
    newData.lastModified = new Date().toJSON();

    this.modelsService.editModel(newData).subscribe(res => {
      if (res) {
        console.log('Provider updated successfully');
        model.defaultProvider = providerId;
      } else {
        console.error('Error during Provider update');
      }
    });
  }
}
