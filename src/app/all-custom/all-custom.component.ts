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
  optional : Optional[] = []
  sections: string[] = []

  public templateSec : TemplateSec[] = []

  constructor() {
    this.dataTypes.push("Integer")
    this.dataTypes.push("Double")
    this.dataTypes.push("Boolean")
    this.dataTypes.push("Date")
    this.dataTypes.push("String")

    this.optional.push(new Optional())

    this.templateSec.push(new TemplateSec())

  }

  ngOnInit(): void {
  }

  addField() {
    this.optional.push(new Optional())
  }

  addNewSection() {
    this.templateSec.push(new TemplateSec())
  }
}
