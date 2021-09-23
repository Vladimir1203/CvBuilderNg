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

  arrayOfOptional1 : Optional1[] = []

  templateSec : TemplateSec[] = []
  templateSec1 : TemplateSec1[] = []

  idOption : number = 0
  idOption1 : number = 0

  //test
  optionals1 : Optional1[] = []
  optionals : Optional[] = []
  optional1 : Optional1


  testOptional1 : Optional1[] = []
  testOptional : Optional[] = []
  testSize = 0


  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  });

  addingOptional1 = new Optional1
  optionsInit : Optional[] = []
  optionalInit : Optional
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

    this.addingOptional1 = {
        id : this.idOption1++,
        optionals : this.optionsInit
    }
    this.arrayOfOptional1.push(this.addingOptional1)
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
    for(let i =0; i < this.testOptional.length; i++){
      console.log("value ! " + this.testOptional[i].value)

    }

    console.log("duzina" + this.testOptional)
  }


  addSection(index : number){
    let optionalsTest = new Optional1
    optionalsTest.optionals = this.templateSec[index].optionals
    for(let i = 0; i < optionalsTest.optionals.length; i++) {
      optionalsTest.optionals[i].value = ''
      optionalsTest.optionals[i].id = ++this.idOption
    }
    optionalsTest.id = this.idOption1
    this.templateSec1[index].optionals1.push(optionalsTest)
  }

  addSection1(index : number){
    //prolazi se kroz sve dodate OPTIONAL-e u konfiguraciji
    for(let i = 0; i < this.templateSec[index].optionals.length; i++){
      //cilje je napraviti Optional za svaku iteraciju, dodati ga na Optional 1
      this.optionalInit = new Optional()
      this.optionalInit.id = this.idOption++
      this.optionalInit.optionalType = this.templateSec[index].optionals[i].optionalType
      this.optionalInit.optionalColumn = this.templateSec[index].optionals[i].optionalColumn

      //PROBLEM!!!!
      this.arrayOfOptional1[this.arrayOfOptional1.length-1].optionals.push(this.optionalInit)



      console.log(this.arrayOfOptional1.length)
      //console.log(this.arrayOfOptional1[this.arrayOfOptional1.length-1].optionals.length)
    }
    //izgleda da addingOptional1 polje diretkno utice na formu (moguce da ngmodel sa njega i vuce podatke)
    //stoga treba naci nacin da se napravi za svaki put kad se klikne da se ubacuje novi "addingOptional1"
    //to jest nova varijabla ovog tipa
    this.templateSec1[index].optionals1.push(this.arrayOfOptional1[this.arrayOfOptional1.length-1])
    this.arrayOfOptional1.push(this.addingOptional1)
  }

  //DOVDE SVE OKKK PUCA NORMALNO
}
