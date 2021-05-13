import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteModelDialogComponent} from "../delete-model-dialog/delete-model-dialog.component";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-modules-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {
  models: Model[] = [];
  filteredModels: Model[] = [];

  // ----- Constructor ----- \\
  constructor(
    public dialog: MatDialog,
    private modelsService: ModelsService,
    private snackBar: MatSnackBar
  ) {}

  // ----- Init ----- \\
  ngOnInit(): void {
    this.getModels();
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
      if(result === "true") this.deleteModel(model);
    });
  }

  // ----- Feedback ----- \\
  openSnackBar(message: string, action: string): void{
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {

    })
  }

  // ----- Methods ----- \\

  /** Get Models from back-end via services*/
  private getModels(): void{
    this.modelsService.getModels()
      .subscribe(models => {
        this.models = models;
        this.filteredModels = this.models;
      });
  }

  /** Send a DELETE request to beck-end via service */
  private deleteModel(model: Model): void{
    this.modelsService.deleteModel(model).subscribe(res => {
      if(res){
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
    if(!name.trim()){
      this.getModels();

      let searchBox = <any> document.getElementById('search-box');
      searchBox.value = "";

      return;
    }

    // filter model list shown on the template
    this.filteredModels = this.models.filter(model => model.name.toLowerCase().includes(name.trim().toLowerCase()));
  }

  applyFilter(value: string) {
    this.searchModel(value.trim());
  }
}
