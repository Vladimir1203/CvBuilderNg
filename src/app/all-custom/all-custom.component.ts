import { Component, OnInit } from '@angular/core';
import {OptionalEntity} from "../shared/dto/optional-entity";
import {OptionalSection} from "../shared/dto/optional-section";
import {Router} from "@angular/router";
import {SendCustomConfigService} from "../service/send-custom-config.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomTemplateService} from "../service/custom/custom-template.service";
import {OptionalTemplate} from "../shared/dto/optional-template";


@Component({
  selector: 'app-all-custom',
  templateUrl: './all-custom.component.html',
  styleUrls: ['./all-custom.component.css']
})
export class AllCustomComponent implements OnInit {

  //u templateSec se nalaze svi podaci sa forme (konfiguracija citava za custom kreiranje CV-a)
  templateSec : OptionalSection[] = []


  nameOfTheTemplate : string = ''

  dataTypes : string[] = []

  sections: string[] = []
  o : number
  //ovo je test
  templateSection : OptionalSection
  optionalSection : OptionalEntity
  profilePicture: false;

  //form validator
  submitted = false;
  exampleForm: FormGroup;

  firstFormGroup : FormGroup

  brojac : number = 0

  constructor(private customTemplateService : CustomTemplateService, private router : Router, private customService : SendCustomConfigService, private formBuilder: FormBuilder) {
    this.dataTypes.push("String")
    this.dataTypes.push("Integer")
    this.dataTypes.push("Double")
    this.dataTypes.push("Boolean")
    this.dataTypes.push("Date")

    //ovo je test
    this.templateSection = new OptionalSection()
    this.optionalSection = new OptionalEntity()
    this.templateSection.optionals = []
    this.optionalSection.optionalColumn = ''
    this.optionalSection.optionalType = ''
    this.templateSection.name = ''
    this.templateSection.repeatable = false
    this.templateSection.optionals.push(this.optionalSection)


    this.templateSec[0] = new OptionalSection()
    this.templateSec[0].optionals = []
    this.templateSec[0].optionals[0] = new OptionalEntity()
    this.templateSec[0].optionals[0].optionalColumn = ''
    this.templateSec[0].optionals[0].optionalType = 'String'
    this.templateSec[0].name = ''
    this.templateSec[0].repeatable = false



  }

  ngOnInit(): void {
    // this.firstFormGroup = new FormGroup({
    //   name0 : new FormControl('', Validators.required),
    // })
    this.exampleForm = this.formBuilder.group({
      fieldName: [this, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]]
    });
  }

  addField(index : number) {
    this.templateSec[index].optionals.push(new OptionalEntity("String"))
    //this.brojac++
    //this.firstFormGroup.addControl('name'+this.brojac, new FormControl('', Validators.required))
  }

  addNewSection(index : number) {
    index++
    this.templateSec.push(new OptionalSection())
    this.templateSec[index].optionals = []
    this.templateSec[index].optionals[0] = new OptionalEntity()
    this.templateSec[index].optionals[0].optionalColumn = ''
    this.templateSec[index].optionals[0].optionalType = ''
    this.templateSec[index].optionals[0].value = ''
    this.templateSec[index].name = ''
    this.templateSec[index].repeatable = false
  }

  isEverythingValid() {
    if( this.nameOfTheTemplate === '')
      return false;
    for(let i = 0; i < this.templateSec.length; i++){
      if(this.templateSec[i].name === '')
        return false;
      for(let j = 0; j < this.templateSec[i].optionals.length; j++){
        if(this.templateSec[i].optionals[j].optionalColumn === '')
          return false;
      }
    }
    return true;
  }

  saveConfiguration() {
    if(!this.isEverythingValid()){
      alert("Please fill all fields. (Name of template, name of all sections and all the fields)")
      return;
    }

    let  optionalTemplate : OptionalTemplate
    optionalTemplate = {
      templateAllSectionsId : 0,
      hasPicture : this.profilePicture,
      name : this.nameOfTheTemplate,
      optionalSections : this.templateSec
    }
    this.customTemplateService.saveCustomTemplate(optionalTemplate)
    //this.customTemplateService.saveCustomTemplateList(this.templateSec)
    this.customService.sendCustomConfiguration(this.templateSec, this.profilePicture)
    this.router.navigate(['/allCustomStepper'])
  }
}
