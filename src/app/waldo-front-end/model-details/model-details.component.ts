import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {DeletePointerDialogComponent} from "../delete-pointer-dialog/delete-pointer-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";
import {AFrameViewProvider} from "../providers/a-frame/view/AFrameViewProvider";
import {ThreejsViewProvider} from "../providers/three-js/view/ThreejsViewProvider";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  model: Model = this.emptyModel();
  editModelMode = false;
  editPointerMode = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelsService: ModelsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getModel();
  }

  toggleEditModelMode(edit: boolean){
    edit ? this.editModelMode = true : this.editModelMode = false;
    console.log(this.editModelMode);
  }

  toggleEditPointerMode(edit: boolean){
    edit ? this.editPointerMode = true : this.editPointerMode = false;
    console.log(this.editPointerMode);
  }

  openDeleteDialog(){
    let dialogRef = this.dialog.open(DeletePointerDialogComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result: ${result}`);
    })
  }

  goBack(){
    this.location.back();
  }

  getModel(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.modelsService.getModel(id)
      .subscribe(model => {
        this.model = model;

        let provider = new ThreejsViewProvider();
        provider.renderModel(this.model);
      });
  }

  emptyModel(): Model{
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
}
