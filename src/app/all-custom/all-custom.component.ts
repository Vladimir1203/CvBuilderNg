import { Component, OnInit } from '@angular/core';
import {Optional} from "../shared/dto/optional";
import {TemplateSec} from "../shared/dto/template-sec";
import {Router} from "@angular/router";
import {SendCustomConfigService} from "../service/send-custom-config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomTemplateService} from "../service/custom/custom-template.service";
import {TemplateAllSections} from "../shared/dto/template-all-sections";


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
  profilePicture: false;

  //form validator
  submitted = false;
  exampleForm: FormGroup;

  firstFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private customTemplateService : CustomTemplateService, private router : Router, private customService : SendCustomConfigService, private formBuilder: FormBuilder) {
    this.dataTypes.push("String")
    this.dataTypes.push("Integer")
    this.dataTypes.push("Double")
    this.dataTypes.push("Boolean")
    this.dataTypes.push("Date")

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
    this.templateSec[0].optionals[0].optionalType = 'String'
    this.templateSec[0].name = ''
    this.templateSec[0].repeatable = false



  }

  ngOnInit(): void {
    this.exampleForm = this.formBuilder.group({
      fieldName: [this, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]]
    });
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
    this.templateSec[index].optionals[0].value = ''
    this.templateSec[index].name = ''
    this.templateSec[index].repeatable = false
  }



  saveConfiguration() {
    let  template : TemplateAllSections
    template = {
      name : "testTemplate",
      allSections : this.templateSec
    }
    this.customTemplateService.saveCustomTemplate(template)
    //this.customTemplateService.saveCustomTemplateList(this.templateSec)
    this.customService.sendCustomConfiguration(this.templateSec, this.profilePicture)
    this.router.navigate(['/allCustomStepper'])
  }
}
