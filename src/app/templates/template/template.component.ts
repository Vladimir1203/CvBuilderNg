import { Component, OnInit } from '@angular/core';
import {Template} from "./template";
import {TemplateService} from "../../service/template.service";
import {HttpErrorResponse} from "@angular/common/http";

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



}
