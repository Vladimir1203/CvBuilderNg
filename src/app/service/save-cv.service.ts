import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewCv} from "../shared/dto/new-cv";

@Injectable({
  providedIn: 'root'
})
export class SaveCVService {

  private apiServerUrl = environment.apiBaseUrl;
  newCv : NewCv;

  constructor(private http : HttpClient) {
  }

  public addNewCv(newCv: NewCv): Observable<NewCv> {
    return this.http.post<NewCv>(`${this.apiServerUrl}/cvs/add-new`, newCv);
  }
}
