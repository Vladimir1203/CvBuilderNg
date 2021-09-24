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
import {style} from "@angular/animations";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import {ExternalDataRetrievedFromServer} from "../shared/dto/externalDataRetrievedFromServer";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-all-custom-stepper',
  templateUrl: './all-custom-stepper.component.html',
  styleUrls: ['./all-custom-stepper.component.css']
})
export class AllCustomStepperComponent implements OnInit {

  templateSec1 : TemplateSec1[] = []

  externalDataRetrievedFromServerTest : ExternalDataRetrievedFromServer[] = []

  arrayOfOptional1 : Optional1[] = []

  templateSec : TemplateSec[] = []

  idOption : number = 0
  idOption1 : number = 0


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
      this.templateSec1[i].name = this.templateSec[i].name
      this.templateSec1[i].repeatable = this.templateSec[i].repeatable
      this.templateSec1[i].optionals1 = []

      this.optional1 = {
        id : 1,
        optionals : []
      }

      this.optionals1.push(this.optional1)
      this.templateSec1[i].optionals1 = this.optionals1

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
  }

  onClickingPreview() {
    this.showPdf()
  }

  async showPdf() {

    let docDefinition = {
      content: [
        {
          columns: [[
            this.getOneCustomObject()

          ]]
        }

      ]

    };
    pdfMake.createPdf(docDefinition).open();
  }


  getOneCustomObject(){
    let array = []
    array[0] = this.getCustomObjectHeader(this.templateSec1[0].name)
    array[1] = this.getCustomObjectBody(this.templateSec1[0])
    return array
  }


  getCustomObjectBody(templateSec1: TemplateSec1) {
    let array = []
    for(let i = 0; i < templateSec1.optionals1.length; i++){
      array[i] = this.getCustomObjectOptional1Info(templateSec1.optionals1[i])
    }
    return array
  }

  getCustomObjectOptional1Info(optional1: Optional1) {
    return {
      text : optional1.optionals[0].optionalColumn + " :" + optional1.optionals[0].value,
      alignment: 'left',
      fontSize: 12,
      bold: true
    }
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

  getAllCustomObjectsHeaders(){
    let array = []
    for(let i = 0; i < this.templateSec1.length; i++){
      array[i] = this.getCustomObjectHeader(this.templateSec1[i].name)
    }
    return array
}

  getAllCustomObjects(){
    let array = []
    array[0] = this.getAllCustomObjectsHeaders()
    array[1] = this.getCustomObjectHeader("test")
    return array
}











  printing(){
    for(let i =0; i < this.templateSec1.length; i++){
      if(this.templateSec1[i].repeatable){
        this.createTableFromTheRepeatableSection(this.templateSec1[i])
      }

      this.generateBasicSection(this.templateSec1[i])
    }
  }

  createTableFromTheRepeatableSection(templateSec1: TemplateSec1) {
    let columnNumber = templateSec1.optionals1[0].optionals.length

    return {


    };
  }


  generateBasicSection(templateSec1: TemplateSec1) {

    let basicRow = '';
    for (let i = 0; i < templateSec1.optionals1[0].optionals.length; i++) {
      basicRow = basicRow  + this.createBasicRow(templateSec1.optionals1[0].optionals[i].optionalColumn, templateSec1.optionals1[0].optionals[i].value) + ', '
    }
    return basicRow
  }

  createBasicRow(optionalColumn: string, value: string) {
    return{
      text : "\r" + optionalColumn +  ": " + value,
      style: 'name',
      alignment: 'left'
    }

  }

  getEducationObjectHeader() {
    return {
      text: "Education section",
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',
    }
  }

  test = 'mojTest'

  concatAll(ext : Array<any>){
    for(let i = 0; i < ext.length; i++){
      if(i != 0)
      ext = [...ext[i-1], ...ext[i]]
    }
    return ext
  }

  externalDataRetrievedFromServer(){
   let ext = []

    for (let i = 0; i < this.templateSec1[0].optionals1[0].optionals.length; i++) {
      let object = {}
      object[this.templateSec1[0].optionals1[0].optionals[i].optionalColumn] = this.templateSec1[0].optionals1[0].optionals[i].value;
      ext.push({object})
    }
    this.concatAll(ext)
    return ext
  }

   externalDataRetrievedFromServerReal = [
    { myName: 'Juan', myAge: 34 },
    { myName: 'John', myAge: 27 },
    { myName: 'Elizabeth', myAge: 30 },
  ];

   buildTableBody(data, columns) {
    var body = [];

    body.push(columns);
    console.log(data)
    data = JSON.parse(data)
    data.forEach(function(row) {
      var dataRow = [];

      columns.forEach(function(column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);
    });

    return body;
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

  rowsForCreatingTable(){
    let helpArray = []
    for(let i = 0; i < this.templateSec1[0].optionals1[0].optionals.length; i++){
      helpArray.push(this.templateSec1[0].optionals1[0].optionals[i].value)
    }
    var data = JSON.stringify(helpArray)
    return JSON.parse(data)
  }
  columnsForCreatingTable(){
     let helpArray = []
    for(let i = 0; i < this.templateSec1[0].optionals1[0].optionals.length; i++){
      helpArray.push(this.templateSec1[0].optionals1[0].optionals[i].optionalColumn)
    }
    return helpArray
  }

  buildTableBodyTest(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      });
      body.push(dataRow);
    });

// Fix table headers
    switch (columns[0]) {
      case "who":
        columns[0] = "As a...";
        columns[1] = "I want to...";
        columns[2] = "So I can..";
        break;
      case "name":
        columns[0] = "Name";
        columns[1] = "Description";
        break;
      default:
        console.log(`Not found`);
    }
    return body;
  }


  sourceData = [{ name: 'Bartek', age: 34 },
    { name: 'John', age: 27 },
    { name: 'Elizabeth', age: 30 }]

  bodyData = [];
  dd1 = {
    content: [
      {
        table: {
          body: this.bodyData
        }
      }
    ]
  }
  creatingRowsI(){
    this.sourceData.forEach(function(sourceRow) {
      var dataRow = [];

      dataRow.push(sourceRow.name);
      dataRow.push(sourceRow.age);

      this.bodyData.push(dataRow)
    });
  }



}
