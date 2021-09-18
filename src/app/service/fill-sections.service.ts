import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FillSectionsService {

  sections : string[] = [];

  userChangedSections = false

  constructor() { }

  fillTheChosenSections(sections: string[]) {
      this.sections = sections;
      this.userChangedSections = true
  }

}
