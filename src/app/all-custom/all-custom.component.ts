import { Component, OnInit } from '@angular/core';
import {Optional} from "../shared/dto/optional";
import {TemplateSec} from "../shared/dto/template-sec";
import {Router} from "@angular/router";
import {SendCustomConfigService} from "../service/send-custom-config.service";


@Component({
  selector: 'app-all-custom',
  templateUrl: './all-custom.component.html',
  styleUrls: ['./all-custom.component.css']
})
export class AllCustomComponent implements OnInit {
  //u templateSec se nalaze svi podaci sa forme (konfiguracija citava za custom kreiranje CV-a)
  templateSec : TemplateSec[] = []



  dataTypes : string[] = []

  sections: string[] = []
  o : number
  //ovo je test
  templateSection : TemplateSec
  optionalSection : Optional
  constructor(private router : Router, private customService : SendCustomConfigService) {
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
    this.optionalSection.optionalType = ''
    this.templateSection.name = ''
    this.templateSection.repeatable = false
    this.templateSection.optionals.push(this.optionalSection)


    this.templateSec[0] = new TemplateSec()
    this.templateSec[0].optionals = []
    this.templateSec[0].optionals[0] = new Optional()
    this.templateSec[0].optionals[0].optionalColumn = ''
    this.templateSec[0].optionals[0].optionalType = ''
    this.templateSec[0].name = ''
    this.templateSec[0].repeatable = false



  }

  ngOnInit(): void {
  }

  addField(index : number) {
    this.templateSec[index].optionals.push(new Optional())
  }

  addNewSection(index : number) {
    index++
    this.templateSec.push(new TemplateSec())
    this.templateSec[index].optionals = []
    this.templateSec[index].optionals[0] = new Optional()
    this.templateSec[index].optionals[0].optionalColumn = ''
    this.templateSec[index].optionals[0].optionalType = ''
    this.templateSec[index].name = ''
    this.templateSec[index].repeatable = false
  }


  results() {
    for(let i = 0; i<this.templateSec.length; i++){
      console.log("naziv: " + this.templateSec[i].name)
      console.log("repeatable: " + this.templateSec[i].repeatable)
      for(let j = 0; j<this.templateSec[i].optionals.length; j++) {
        console.log("polje " + this.templateSec[i].optionals[j].optionalColumn)
        console.log("type " + this.templateSec[i].optionals[j].optionalType)
      }
    }
  }

  saveConfiguration() {
    this.customService.sendCustomConfiguration(this.templateSec)
    this.router.navigate(['/allCustomStepper'])
  }
}
