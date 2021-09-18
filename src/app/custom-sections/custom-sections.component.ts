import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NewCVComponent} from "../new-cv/new-cv.component";
import {FillSectionsService} from "../service/fill-sections.service";

@Component({
  selector: 'app-custom-sections',
  templateUrl: './custom-sections.component.html',
  styleUrls: ['./custom-sections.component.css']
})
export class CustomSectionsComponent implements OnInit {

  skillsVisible: boolean = true;
  workExpVisible : boolean = true;
  educationVisible : boolean = true;
  hobbiesVisible : boolean = true;
  pictureVisible : boolean = true;
  customVisible : boolean = true;
  sections : string[] = [];

  constructor(private router : Router, private fillSectionService : FillSectionsService) {

  }

  ngOnInit(): void {
  }

  changeStateSkills() {
    this.skillsVisible = false
    this.sections.push('skills')
  }

  changeStateWorkExp() {
    this.workExpVisible = false
    this.sections.push('workExp')
  }
  changeStateEducation() {
    this.educationVisible = false
    this.sections.push('education')
  }
  changeStateHobbies() {
    this.hobbiesVisible = false
    this.sections.push('hobbies')
  }
  changeStatePicture() {
    this.pictureVisible = false
    this.sections.push('picture')
  }
  changeStateCustom() {
    this.customVisible = false
    this.sections.push('custom')
  }

  finished(){

    this.fillSectionService.fillTheChosenSections(this.sections)

    this.router.navigate(['/newCV'])

  }
}
