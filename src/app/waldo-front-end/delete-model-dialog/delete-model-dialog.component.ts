import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-model-dialog',
  templateUrl: './delete-model-dialog.component.html',
  styleUrls: ['./delete-model-dialog.component.css']
})
export class DeleteModelDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
