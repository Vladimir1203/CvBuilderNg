import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {BasicInformationService} from "../service/basic-information.service";
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {BasicInformationSection} from "../shared/dto/basic-information-section";
import {WorkExperienceSection} from "../shared/dto/work-experience-section";
import {NewCv} from "../shared/dto/new-cv";
import {Router} from "@angular/router";
import {SaveCVService} from "../service/save-cv.service";
import {EducationSection} from "../shared/dto/education-section";
import {InterestSection} from "../shared/dto/interest-section";
import {CustomSection} from "../shared/dto/custom-section";
import {  VERSION } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {SkillSection} from "../shared/dto/skill-section";
import {FillSectionsService} from "../service/fill-sections.service";


export class Skill {
  value: string;
  constructor(skill : string) {
    this.value = skill
  }
}

export class Resume {
  profilePic: string;
  name: string;
  address: string;
  contactNo: number;
  email: string;
  skills: Skill[] = [];

  constructor() {
   // this.skills.push(new Skill("testing skill"));
  }
}


@Component({
  selector: 'app-new-cv',
  templateUrl: './new-cv.component.html',
  styleUrls: ['./new-cv.component.css']
})
export class NewCVComponent implements OnInit {
  basicInformationSection : BasicInformationSection;
  skillsFromTheForm : SkillSection[] = [];
  interestsSection : InterestSection[] = [];
  educationSections : EducationSection[] = [];
  customSections : CustomSection[] = [];
  workExperienceSections : WorkExperienceSection[] = [];

  sections : string[] = [];

  workExperienceSection : WorkExperienceSection;

  educationSection : EducationSection


  newCv : NewCv;


  name = 'Angular ' + VERSION.major;

  resume = new Resume();

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    jobTitle: ['', Validators.required],
    companyName: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    schoolName: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    title: ['', Validators.required]
  });
  fourthFormGroup = this._formBuilder.group({
    firstChoice: ['', Validators.required],
    secondChoice: ['', Validators.required],
    testing: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    test1: ['', Validators.required],
    test2: ['', Validators.required],
    test3: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    test1: ['', Validators.required],
  });
  seventhFormGroup = this._formBuilder.group({
    reference: ['', Validators.required],
    text: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fillSectionService : FillSectionsService, private cd : ChangeDetectorRef, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private router: Router, private saveCVService : SaveCVService, private basicInformationService : BasicInformationService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
    this.basicInformationSection = {
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      address:'',
    }
    this.workExperienceSection = {
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate:'',
    }
    this.educationSection = {
      schoolName: '',
      startDate: '',
      endDate: '',
      title : ''
    }


    this.skillsFromTheForm.push(new SkillSection())
    this.interestsSection.push(new InterestSection())
    this.educationSections.push(new EducationSection())
    this.workExperienceSections.push(new WorkExperienceSection())
    this.customSections.push(new CustomSection())


    this.newCv = {
      basicInformationSection : null,
      workExperienceSection : null,
      educationSection : null,
      interestSection : null
    }
    this.newCv.basicInformationSection = {
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      address:'',
    }
    this.newCv.workExperienceSection = {
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate:'',
    }
    this.newCv.educationSection = {
      schoolName: '',
      startDate: '',
      endDate: '',
      title : ''
    }
    this.newCv.interestSection = {
      hobby : ''
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    this.resume = new Resume() //JSON.parse(sessionStorage.getItem('resume')) || new Resume();

    //skills
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill(""));
    }

  }

  ngOnInit(): void {
    if(this.fillSectionService.userChangedSections){
      this.sections = this.fillSectionService.sections
    }else{
      this.sections.push('hobbies')
      this.sections.push('education')
      this.sections.push('skills')
      this.sections.push('workExp')
      this.sections.push('picture')
    }
  }

  onClickingSave() {
    this.basicInformationSection.name = this.firstFormGroup.controls['name'].value
    this.basicInformationSection.surname = this.firstFormGroup.controls['surname'].value
    this.basicInformationSection.email = this.firstFormGroup.controls['email'].value
    this.basicInformationSection.phoneNumber = this.firstFormGroup.controls['phoneNumber'].value
    this.basicInformationSection.address = this.firstFormGroup.controls['address'].value
    //basic done
    for(let i = 0; i < this.customSections.length; i++)
    this.customSections[i].nameOfTheSection = this.seventhFormGroup.controls['reference'].value

    for(let i = 0; i < this.customSections.length; i++)
      console.log(this.customSections[i])
    console.log("a evo i imena sekcije" + this.customSections[0].nameOfTheSection)


    this.workExperienceSection.jobTitle = this.secondFormGroup.controls['jobTitle'].value
    this.workExperienceSection.companyName = this.secondFormGroup.controls['companyName'].value
    this.workExperienceSection.startDate = this.secondFormGroup.controls['startDate'].value
    this.workExperienceSection.endDate = this.secondFormGroup.controls['endDate'].value


    this.educationSection.schoolName = this.thirdFormGroup.controls['schoolName'].value
    this.educationSection.endDate = this.thirdFormGroup.controls['endDate'].value
    this.educationSection.startDate = this.thirdFormGroup.controls['startDate'].value
    this.educationSection.title = this.thirdFormGroup.controls['title'].value


    this.newCv.basicInformationSection = this.basicInformationSection
    this.newCv.workExperienceSection = this.workExperienceSection
    this.newCv.educationSection = this.educationSection




    // this.saveCVService.addNewCv(this.newCv)
    //   .subscribe(data => {
    //     this.router.navigate(['/home'], {
    //       queryParams: {registered: 'true'}
    //     });
    //   }, error => console.log('Saving CV Failed! Please try again'));
  }

  generatePdf(action = 'open') {
    const documentDefinition = null;

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  addSkill() {
    this.skillsFromTheForm.push(new SkillSection)
    this.resume.skills.push(new Skill(""));
    //this.cd.detectChanges()
  }

  addInterest() {
    this.interestsSection.push(new InterestSection())
  }

  onClickingPreview() {
    this.showPdf()
  }

  async showPdf() {
    this.basicInformationSection.name = this.firstFormGroup.controls['name'].value
    this.basicInformationSection.surname = this.firstFormGroup.controls['surname'].value
    this.basicInformationSection.email = this.firstFormGroup.controls['email'].value
    this.basicInformationSection.phoneNumber = this.firstFormGroup.controls['phoneNumber'].value
    this.basicInformationSection.address = this.firstFormGroup.controls['address'].value
    //basic done
    for(let i = 0; i < this.customSections.length; i++)
      this.customSections[i].nameOfTheSection = this.seventhFormGroup.controls['reference'].value

    for(let i = 0; i < this.customSections.length; i++)
      console.log(this.customSections[i])
    console.log("a evo i imena sekcije" + this.customSections[0].nameOfTheSection)
    let docDefinition = {
      //here is where the content starts
      content: [

        {
          alignment: 'justify',
          columns:
            [

            {
              text : ''
            },
            {
              columns:[ this.getProfilePicObject()]
            }
          ]
        },


        {
          columns: [
            [
              {
                text : "About me\r" ,
                style: 'header',
                alignment: 'left'

              },
              {
                text : 'Name: ' + this.basicInformationSection.name + ' ' + this.basicInformationSection.surname,
                style: 'name',
                alignment: 'left'

              },
              {
                text : "\r" + "Email: " + this.basicInformationSection.email ,
                style: 'name',
                alignment: 'left'

              },
              {
                text : "\r" + "Phone number:" + this.basicInformationSection.phoneNumber ,
                style: 'name',
                alignment: 'left'

              },
              {
                text : "\r" + "Address: " + this.basicInformationSection.address ,
                style: 'name',
                alignment: 'left'
              },

            ],
          ]

        },

        this.getExperienceObjectHeader(),
        this.getExperienceObject(this.workExperienceSections),



        this.getSkillObjectHeader(),
        this.getSkillObject(),




        this.getEducationObjectHeader(),
        this.getEducationObject(this.educationSections),



        this.getInterestObjectHeader(),
        this.getInterestObject(),



        this.getCustomObjectHeader(),
        this.getCustomObject(this.customSections)

        ],

      info: {
        title: this.basicInformationSection.name + '_RESUME',
        author: this.basicInformationSection.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          color: '#339999',
        },
        name: {
          fontSize: 12,
          bold: true
        },
        headersname: {
          fontSize: 18,
          bold: true
        },
        jobTitle: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        },


      },

    };

    pdfMake.createPdf(docDefinition).open();
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 155,
        absolutePosition: { x: 350, y: 40 }
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }



  getEducationObjectHeader() {
    if(!this.sections.includes('education')){return {}}
    return {
      text: "Education section",
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',
    }
  }
  getEducationObject(interests: EducationSection[]) {
  if(!this.sections.includes('education')){return {}}

    const int = [];

    interests.forEach(interest => {
      int.push(
        [{
          columns: [
            [
              {
              text: "Name: " + interest.schoolName,
              style: 'jobTitle'
              },
            ],
            [
              {
                text: "from: " + interest.startDate,
                style: 'jobTitle'
              },
            ],
            [
              {
                text: "to: " + interest.endDate,
                style: 'jobTitle'
              },
            ],

            [
              {
                text: "title: " + interest.title,
                style: 'jobTitle'
              },
            ]
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...int
        ]
      }
    };
  }


  getExperienceObject(educations: WorkExperienceSection[]) {
    if(!this.sections.includes('workExp')){return {}}
    return {

      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [{

            illColor: '#d41717',
            text: 'Job title',
            style: 'tableHeader'
          },
            {
              text: 'Company name',
              style: 'tableHeader'
            },
            {
              text: 'Start date',
              style: 'tableHeader'
            },
            {
              text: 'End date',
              style: 'tableHeader'
            },

          ],
          ...educations.map(ed => {
            return [ed.jobTitle, ed.companyName, ed.startDate, ed.endDate];
          })
        ],

      },
      layout: 'lightHorizontalLines'

    };
  }
  getExperienceObjectHeader() {
    if(!this.sections.includes('workExp')){return {}}
    return {
      text : "\rWork experience" ,
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',

    }
  }


  getCustomObjectHeader(){
    if(!this.sections.includes('custom')){return {}}
      return  {
      text : "\r" + this.customSections[0].nameOfTheSection ,
        fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',
      alignment: 'left'
    }
  }
  getCustomObject(customs : CustomSection[]){
    if(!this.sections.includes('custom')){return {}}
    {
      return {
        table: {
          body: [
            [
              {

              illColor: '#d41717',
              text: '',
              style: 'tableHeader'
            },
              {
                text: '',
                style: 'tableHeader'
              },

            ],
          ...customs.map(cus => {
            return [cus.field, cus.value];
          })
          ],
        },
        layout: {
          fillColor: function (rowIndex) {
            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
          }
        }
      }
    }

  }


  getSkillObject(){
    if(!this.sections.includes('skills')){return {}}
    return {
      columns : [
        {
          ul : [
            ...this.skillsFromTheForm.filter((value, index) => index % 3 === 0).map(s => s.skill)
          ]
        },
        {
          ul : [
            ...this.skillsFromTheForm.filter((value, index) => index % 3 === 1).map(s => s.skill)
          ]
        },
        {
          ul : [
            ...this.skillsFromTheForm.filter((value, index) => index % 3 === 2).map(s => s.skill)
          ]
        }
      ]
    }
  }
  getSkillObjectHeader() {
    if(!this.sections.includes('hobbies')){return {}}
    return {
      text: 'Skills',
      fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999',
    }
  }


  getInterestObjectHeader(){
    if(!this.sections.includes('hobbies')){return {}}
    return {
      text: 'Hobbies',
        fontSize: 18,
      bold: true,
      margin: [0, 20, 0, 10],
      color: '#339999'
    }
  }
  getInterestObject(){
    if(!this.sections.includes('hobbies')){return {}}
    return {
      columns : [
        {
          ul : [
            ...this.interestsSection.filter((value, index) => index % 5 === 0).map(h => h.hobby)
          ]
        },
        {
          ul : [
            ...this.interestsSection.filter((value, index) => index % 5 === 1).map(h => h.hobby)
          ]
        },
        {
          ul : [
            ...this.interestsSection.filter((value, index) => index % 5 === 2).map(h => h.hobby)
          ]
        },
        {
          ul : [
            ...this.interestsSection.filter((value, index) => index % 5 === 3).map(h => h.hobby)
          ]
        },
        {
          ul : [
            ...this.interestsSection.filter((value, index) => index % 5 === 4).map(h => h.hobby)
          ]
        }
      ]
    }
  }



  containsWorkEx(){
    if(this.sections.includes("workExp"))
      return true;
    return false;
  }
  containsEducation(){
    if(this.sections.includes("education"))
      return true;
    return false;
  }
  containsSkills(){
    if(this.sections.includes("skills"))
      return true;
    return false;
  }
  containsHobbies(){
    if(this.sections.includes("hobbies"))
      return true;
    return false;
  }
  containsCustom(){
    if(this.sections.includes("custom"))
      return true;
    return false;
  }
  containsPicture(){
    if(this.sections.includes("picture"))
      return true;
    return false;
  }

  addEducation() {
    this.educationSections.push(new EducationSection())
  }
  addExperience() {
    this.workExperienceSections.push(new WorkExperienceSection())
  }
  addCustomSection() {
    this.customSections.push(new CustomSection())
  }



}


