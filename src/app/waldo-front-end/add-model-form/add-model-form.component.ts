import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-model-form',
  templateUrl: './add-model-form.component.html',
  styleUrls: ['./add-model-form.component.css']
})
export class AddModelFormComponent implements OnInit {
  addModelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  get modelName(){
    return this.addModelForm.get('modelName');
  }

  get modelSource(){
    return this.addModelForm.get('modelSource');
  }

  get additionalSources(){
    return this.addModelForm.get('additionalSources') as FormArray
  }

  ngOnInit(): void {
    this.addModelForm = this.fb.group({
      modelName: ['', [Validators.required, Validators.minLength(5)]],
      modelSource: ['', Validators.required],
      additionalSources: this.fb.array([])
    })
  }

  addAdditionalSource(){
    this.additionalSources.push(this.fb.control(''))
  }

  goBack(){
    this.location.back();
  }
}
