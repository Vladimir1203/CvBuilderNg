import { Injectable } from '@angular/core';
import {TemplateSec} from "../shared/dto/template-sec";

@Injectable({
  providedIn: 'root'
})
export class SendCustomConfigService {
  templateSec : TemplateSec[] = []
  profilePicture : boolean
  constructor() { }

  sendCustomConfiguration(templateSec: TemplateSec[], profilePicture : boolean) {
    this.templateSec = templateSec
    this.profilePicture = profilePicture
  }

  getCustomConfiguration() {
    return this.templateSec;
  }
}
