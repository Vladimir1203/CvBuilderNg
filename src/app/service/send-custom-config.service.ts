import { Injectable } from '@angular/core';
import {OptionalSection} from "../shared/dto/optional-section";

@Injectable({
  providedIn: 'root'
})
export class SendCustomConfigService {
  templateSec : OptionalSection[] = []
  profilePicture : boolean
  constructor() { }

  sendCustomConfiguration(templateSec: OptionalSection[], profilePicture : boolean) {
    this.templateSec = templateSec
    this.profilePicture = profilePicture
  }

  getCustomConfiguration() {
    return this.templateSec;
  }
}
