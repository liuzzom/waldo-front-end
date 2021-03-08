import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {DeletePointerDialogComponent} from "../delete-pointer-dialog/delete-pointer-dialog.component";

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  editModelMode = false;
  editPointerMode = false;

  constructor(
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
}
