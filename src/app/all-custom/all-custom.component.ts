import { Component, OnInit } from '@angular/core';
import {Optional} from "../shared/dto/optional";
import {TemplateSec} from "../shared/dto/template-sec";


@Component({
  selector: 'app-all-custom',
  templateUrl: './all-custom.component.html',
  styleUrls: ['./all-custom.component.css']
})
export class AllCustomComponent implements OnInit {
  dataTypes : string[] = []

  sections: string[] = []

  templateSec : TemplateSec[] = []
  o : number
  //ovo je test
  templateSection : TemplateSec
  optionalSection : Optional
  constructor() {
    this.dataTypes.push("Integer")
    this.dataTypes.push("Double")
    this.dataTypes.push("Boolean")
    this.dataTypes.push("Date")
    this.dataTypes.push("String")

    //ovo je test
    this.templateSection = new TemplateSec()
    this.optionalSection = new Optional()
    this.templateSection.optionals = []
    this.optionalSection.optionalColumn = ''
    this.templateSection.name = ''
    this.templateSection.optionals.push(this.optionalSection)


    this.templateSec[0] = new TemplateSec()
    this.templateSec[0].optionals = []
    this.templateSec[0].optionals[0] = new Optional()
    this.templateSec[0].optionals[0].optionalColumn = ''
    this.templateSec[0].name = ''



  }

  ngOnInit(): void {
  }

  addField(index : number) {
    console.log("indeks u addField je " + index)
    this.templateSec[index].optionals.push(new Optional())
  }

  addNewSection(index : number) {
    index++
    this.templateSec.push(new TemplateSec())
    this.templateSec[index].optionals = []
    this.templateSec[index].optionals[0] = new Optional()
    this.templateSec[index].optionals[0].optionalColumn = ''
    this.templateSec[index].name = ''
  }

}
