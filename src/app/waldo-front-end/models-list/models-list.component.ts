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

  constructor(
    public dialog: MatDialog,
    private modelsService: ModelsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getModels();
  }

  openDeleteDialog(model) {
    let dialogRef = this.dialog.open(DeleteModelDialogComponent, {
      data: {
        name: model.name,
        id: model.id
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result === "true") this.deleteModel(model);
    });
  }

  openSnackBar(message: string, action: string): void{
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('snackbar dismissed');
    })
  }

  private getModels(): void{
    this.modelsService.getModels()
      .subscribe(models => this.models = models);
  }

  private deleteModel(model: Model): void{
    this.modelsService.deleteModel(model).subscribe(res => {
      if(res){
        this.models = this.models.filter(m => m !== model);
        this.openSnackBar('Model deleted', 'Ok');
      } else {
        this.openSnackBar('Failed to delete the model', 'OK');
      }
    });
  }

  searchModel(name: string) {
    // with an empty name, do some kind of "refresh"
    if(!name.trim()){
      console.log('empty name');
      this.getModels();
      return;
    }

    console.log(name);
    this.modelsService.searchByName(name).subscribe(models => {
      this.models = models;
    });
  }
}
