import { Component, OnInit } from '@angular/core';
import {Template} from "./template";
import {TemplateService} from "../../service/template.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templates : Template[];

  constructor(private templateService : TemplateService) { }

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates(){
    this.templateService.getTemplates().subscribe(
      (response : Template[]) => {
        this.templates = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onOpenModal(template : Template, mode : string){
    const container = document.getElementById('main-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addTemplateModal');
    }
    if(mode === 'edit'){
      button.setAttribute('data-target', '#updateTemplateModal');
    }
    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteTemplateModal');
    }
    container.appendChild(button);
    button.click();
  }


  onAddTemplate(addForm: NgForm) {
    //document.getElementById('add-template-form').click();
    this.templateService.addTemplate(addForm.value).subscribe(
      (response : Template) =>{
        console.log(response);
        this.getTemplates();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }
}
