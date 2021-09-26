import { Component, OnInit } from '@angular/core';
import {Template} from "./template";
import {TemplateService} from "../../service/template.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import { FormBuilder } from '@angular/forms';
import {RegisterRequestPayload} from "../../shared/dto/register-request.payload";
import {Observable} from "rxjs";


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
  });
  templates : Template[];

  constructor(private client : HttpClient, private formBuilder: FormBuilder, private templateService : TemplateService, private router : Router) { }

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

  createBasicCV() {
    this.router.navigate(['/demoCV  '])
  }

  createCustomCV() {
    this.router.navigate(['/customDemoCV'])
  }

}
