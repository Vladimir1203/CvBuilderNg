import { Component, OnInit } from '@angular/core';
import {SendCustomConfigService} from "../service/send-custom-config.service";
import {OptionalSection} from "../shared/dto/optional-section";
import {Observable} from "rxjs";
import {StepperOrientation} from "@angular/material/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TemplateSec1} from "../shared/dto/template-sec1";
import {Optional1} from "../shared/dto/optional1";
import {OptionalEntity} from "../shared/dto/optional-entity";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import {Resume} from "../new-cv/new-cv.component";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-all-custom-stepper',
  templateUrl: './all-custom-stepper.component.html',
  styleUrls: ['./all-custom-stepper.component.css']
})
export class AllCustomStepperComponent implements OnInit {

  templateSec1 : TemplateSec1[] = []


  arrayOfOptional1 : Optional1[] = []

  templateSec : OptionalSection[] = []

  idOption : number = 0
  idOption1 : number = 0


  resume = new Resume();

  optionals1 : Optional1[] = []
  optionals : OptionalEntity[] = []
  optional1 : Optional1


  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  });

  addingOptional1 = new Optional1
  optionsInit : OptionalEntity[] = []
  optionalInit : OptionalEntity
  profilePicture = false

  constructor(private customConfigService : SendCustomConfigService,private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
    this.profilePicture = this.customConfigService.profilePicture
    this.templateSec = this.customConfigService.getCustomConfiguration()
    for(let i = 0; i < this.templateSec.length; i++){
      this.templateSec1[i] = new TemplateSec1()
      this.templateSec1[i].name = this.templateSec[i].name
      this.templateSec1[i].repeatable = this.templateSec[i].repeatable
      this.templateSec1[i].optionals1 = []

      this.optional1 = {
        id : 1,
        optionals : []
      }
      if(i == 0)
      this.optionals1.push(this.optional1)
      this.templateSec1[i].optionals1 = this.optionals1 //ovde je greska //ubaci jedan element Optionals1 u niz optionals1 vise //jedino za nulti ok

        this.templateSec1[i].optionals1[0].optionals = []
        this.templateSec1[i].optionals1[0].optionals = this.templateSec[i].optionals

      this.optionals1 = []
      this.optionals1.push({id : 1, optionals : []})
    }

    this.addingOptional1 = {
        id : this.idOption1++,
        optionals : this.optionsInit
    }
    this.arrayOfOptional1.push(this.addingOptional1)
  }

  addSection(index : number){
    for(let i = 0; i < this.templateSec[index].optionals.length; i++){

      this.optionalInit = {
        id: this.idOption++,
        optionalColumn: this.templateSec[index].optionals[i].optionalColumn,
        optionalType: this.templateSec[index].optionals[i].optionalType,
        value: ''
      }

      this.arrayOfOptional1[this.arrayOfOptional1.length-1].optionals.push(this.optionalInit)

    }

    this.templateSec1[index].optionals1.push(this.arrayOfOptional1[this.arrayOfOptional1.length-1])
    this.arrayOfOptional1.push({id: 1, optionals:[]});
  }

  onClickingSave() {
    this.savePdf()
  }

  onClickingPreview() {
    this.showPdf()
  }

  async showPdf() {

    let docDefinition = {

      content: [
        {
          columns: [[
            this.getProfilePicObject(),
            this.getAllCustomObjectsAndHeaders()
          ]]
        }

      ]

    };
    pdfMake.createPdf(docDefinition).open();
  }

  async savePdf() {

    let docDefinition = {

      content: [
        {
          columns: [[
            this.getProfilePicObject(),
            this.getAllCustomObjectsAndHeaders()
          ]]
        }

      ]

    };
    pdfMake.createPdf(docDefinition).download();
  }

  getAllCustomObjectsAndHeaders(){
    let array = []
    let count = 0
    for(let i = 0; i < this.templateSec1.length; i++){
      array[count++] = this.getCustomObjectHeader(this.templateSec1[i].name)
      if(this.templateSec1[i].optionals1.length > 1){
        array[count++] = this.getCustomObjectOptionalInfoTable(this.templateSec1[i])
      }
      else {
        array[count++] = this.getCustomObjectBody(this.templateSec1[i])
      }
    }
    return array
  }

  getCustomObjectBody(templateSec1: TemplateSec1) {
    let array = []
    for(let i = 0; i < templateSec1.optionals1.length; i++){
      array[i] = this.getCustomObjectOptional1Info(templateSec1.optionals1[i])
    }
    return array
  }

  getCustomObjectOptional1Info(optional1: Optional1){
    let array = []
    for(let i = 0; i < optional1.optionals.length; i++){
      array[i] = this.getCustomObjectOptionalInfo(optional1.optionals[i])
    }
    return array
  }

  getCustomObjectOptionalInfo(optional: OptionalEntity) {
    return {
      text : optional.optionalColumn + " :" + optional.value,
      alignment: 'left',
      fontSize: 12,
      bold: true
    }
  }

  getCustomObjectOptionalInfoTable(templateSec1: TemplateSec1){
    return this.table(this.rowsForCreatingTable(templateSec1), this.columnsForCreatingTable(templateSec1.optionals1[0]))
  }

  getCustomObjectHeader(name: string) {
    return {
      text : "\r" + name ,
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',
    }
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 155,
        absolutePosition: { x: 350, y: 40 }
      };
    }
    return null;
  }






  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      },
      layout: 'lightHorizontalLines'
    };
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
      var dataRow = [];

      columns.forEach(function(column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);
    });

    return body;
  }

  columnsForCreatingTable(optional1 : Optional1){
    let array = []
    for(let i = 0; i < optional1.optionals.length; i++)
      array.push(optional1.optionals[i].optionalColumn)
    return array
  }

  rowsForCreatingTable(templateSec1: TemplateSec1){
    let array = []

    for (let i = 0; i < templateSec1.optionals1.length; i++) {
      let object = {}
      for(let j = 0; j < templateSec1.optionals1[i].optionals.length; j++) {
        object[templateSec1.optionals1[i].optionals[j].optionalColumn] = templateSec1.optionals1[i].optionals[j].value;
      }
      array.push(object)
    }
    return array
  }




}
