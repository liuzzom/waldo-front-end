import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {DeletePointerDialogComponent} from "../delete-pointer-dialog/delete-pointer-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {ModelsService} from "../services/models.service";
import {Model} from "../domain-model/Model";
import {ProviderUtils} from "../providers/provider-utils";
import {ProvidersService} from "../services/providers.service";

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.renderModel();
  }

  toggleEditModelMode(edit: boolean) {
    edit ? this.editModelMode = true : this.editModelMode = false;
    console.log()
  }

  toggleEditPointerMode(edit: boolean) {
    edit ? this.editPointerMode = true : this.editPointerMode = false;
    console.log(this.editPointerMode);
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeletePointerDialogComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result: ${result}`);
    })
  }

  goBack() {
    this.location.back();
  }

  renderModel(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.modelsService.getModel(id).subscribe(model => {
      this.model = model;
      this.selectedProvider = model.defaultProvider;

      const testId = "55800a26-fdc3-47d4-9c8e-b3d609646e1f";

      this.providersService.getProvider(model.defaultProvider).subscribe(providerInfo => {
        const provider = ProviderUtils.createProvider(providerInfo);

        provider.providerFeatures.includes('mark') ? this.pointerSupport = true : this.pointerSupport = false;
        console.log(provider.name);
        console.log(this.pointerSupport);

        provider.renderModel(this.model);
      });
    });
  }

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
}
