import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteModelDialogComponent} from "../delete-model-dialog/delete-model-dialog.component";


@Component({
  selector: 'app-modules-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {
  models = [
    {
      id: "c325f36c-15fe-4ebf-b45b-d85178281806",
      name: "Windmill",
      sources: ["/path/file.obj", "/path/file.mtl"],
      uploaded: "2021-03-02T18:11:19.772Z",
      lastModified: "2021-03-02T18:11:19.772Z",
      supportedProviders: [
        "b4c31c82-b345-4c7d-bccc-22b6170153af",
        "d83badec-80b7-4b63-9e49-278d6540cbce",
        "8d93f4c5-c214-453e-b876-d1d6463ca1f8",
        "55800a26-fdc3-47d4-9c8e-b3d609646e1f",
        "31435989-d23e-401a-b1a7-44b4ae9889fb"
      ]
    },
    {
      id: "c94fcdc6-031d-4a67-814f-8e3ae0cc2910",
      name: "Boom Box",
      sources: [],
      uploaded: "2021-03-02T18:11:19.772Z",
      lastModified: "2021-03-02T18:11:19.772Z",
      supportedProviders: [
        "8d93f4c5-c214-453e-b876-d1d6463ca1f8",
        "55800a26-fdc3-47d4-9c8e-b3d609646e1f",
        "31435989-d23e-401a-b1a7-44b4ae9889fb"
      ]
    },
    {
      id: "38075132-6a5d-4b96-9274-c6dfbed398dc",
      name: "Fantasy Assault",
      sources: [],
      uploaded: "2021-03-02T18:11:19.772Z",
      lastModified: "2021-03-02T18:11:19.772Z",
      supportedProviders: [
        "f6bc3993-456a-4cf3-900b-69e6c8ff888b",
        "34f51504-8326-421c-b0f1-383ebe88fa93",
        "29b8afd0-43ab-42ba-bc8b-c184624f2e49"
      ]
    }
  ];

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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
}
