import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Template} from "../templates/template/template";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) {
  }

  public getTemplates(): Observable<Template[]>{
    return this.http.get<Template[]>(`${this.apiServerUrl}/templates/all`);
  }

  public addTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.apiServerUrl}/template/add`, template);
  }

  public updateTemplate(template: Template): Observable<Template> {
    return this.http.put<Template>(`${this.apiServerUrl}/template/update`, template);
  }

  public deleteTemplate(templateId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/template/delete/${templateId}`);
  }
}
