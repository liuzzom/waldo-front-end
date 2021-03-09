import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteModelDialogComponent} from "../delete-model-dialog/delete-model-dialog.component";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";


@Component({
  selector: 'app-modules-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {
  models: Model[] = [];

  constructor(
    public dialog: MatDialog,
    private modelsService: ModelsService
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
    })
  }

  getModels(): void{
    this.modelsService.getModels()
      .subscribe(models => this.models = models);
  }
}
