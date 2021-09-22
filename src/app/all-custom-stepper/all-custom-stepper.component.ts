import { Component, OnInit } from '@angular/core';
import {SendCustomConfigService} from "../service/send-custom-config.service";
import {TemplateSec} from "../shared/dto/template-sec";
import {Observable} from "rxjs";
import {StepperOrientation} from "@angular/material/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TemplateSec1} from "../shared/dto/template-sec1";
import {Optional1} from "../shared/dto/optional1";
import {Optional} from "../shared/dto/optional";

@Component({
  selector: 'app-all-custom-stepper',
  templateUrl: './all-custom-stepper.component.html',
  styleUrls: ['./all-custom-stepper.component.css']
})
export class AllCustomStepperComponent implements OnInit {

  templateSec : TemplateSec[] = []
  templateSec1 : TemplateSec1[] = []

  //test
  optionals1 : Optional1[] = []
  optionals : Optional[] = []
  optional1 : Optional1


  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  });


  constructor(private customConfigService : SendCustomConfigService,private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
    this.templateSec = this.customConfigService.getCustomConfiguration()
    for(let i = 0; i < this.templateSec.length; i++){
      this.templateSec1[i] = new TemplateSec1()
      this.optional1  =  new Optional1()
      this.templateSec1[i].name = this.templateSec[i].name
      this.templateSec1[i].repeatable = this.templateSec[i].repeatable
      this.optional1.optionals = this.optionals
      this.optionals1.push(this.optional1)
      this.templateSec1[i].optionals1 = this.optionals1
      this.templateSec1[i].optionals1[i].optionals = this.optionals
      this.templateSec1[i].optionals1[i].optionals = this.templateSec[i].optionals
      this.optionals1 = []
      this.optionals1.push(new Optional1())
    }

  }

  onClickingSave() {
    for(let i = 0; i < this.templateSec1.length; i++){
      for(let j = 0; j < this.templateSec1[j].optionals1.length; j++){
        for(let k = 0; k<this.templateSec1[j].optionals1[k].optionals.length; k++){
          console.log("Podatak " + this.templateSec1[i].optionals1[j].optionals[k].optionalColumn + "\n");
          console.log("Tip " + this.templateSec1[i].optionals1[j].optionals[k].optionalType +"\n");
        }
      }
    }
  }

  onClickingPreview() {

  }


  addSection(index : number){
    //radi ali glupo, pretpostavljam da je resnje blizu
    // this.templateSec1[index].optionals1.push(this.templateSec1[index].optionals1[0])
    let optionalsTest = new Optional1
    optionalsTest.optionals = this.templateSec[index].optionals

    this.templateSec1[index].optionals1.push(optionalsTest)
  }
}
