import { Injectable } from '@angular/core';
import {TemplateSec} from "../shared/dto/template-sec";

@Injectable({
  providedIn: 'root'
})
export class SendCustomConfigService {
  templateSec : TemplateSec[] = []

  constructor() { }

  sendCustomConfiguration(templateSec: TemplateSec[]) {
    this.templateSec = templateSec
  }

  getCustomConfiguration() {
    return this.templateSec;
  }
}
