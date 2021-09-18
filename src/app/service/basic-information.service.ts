import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasicInformationSection} from "../shared/dto/basic-information-section";

@Injectable({
  providedIn: 'root'
})
export class BasicInformationService {

  private apiServerUrl = environment.apiBaseUrl;
  basicInformationSection : BasicInformationSection;

  constructor(private http : HttpClient) {
  }

  public addBasicInformationSection(basicInformationSection: BasicInformationSection): Observable<BasicInformationSection> {
    return this.http.post<BasicInformationSection>(`${this.apiServerUrl}/sections/add/basicInformation`, basicInformationSection);
  }
}
