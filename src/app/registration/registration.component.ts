import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {AuthenticationService} from "../service/auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  registerRequestPayload: RegisterRequestPayload;


  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.registerRequestPayload = {
      name: '',
      surname: '',
      username: '',
      email: '',
      address:'',
      password: ''
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname:new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    })
  }

  allFieldsValid() {
    return this.registerForm.get('name').valid && this.registerForm.get('surname').valid && this.registerForm.get('username').valid
      && this.registerForm.get('email').valid && this.registerForm.get('address').valid && this.registerForm.get('password').valid;
  }

  onClickingRegister() {

    if(!this.allFieldsValid()) {
      alert("Wrong input of your data!")
      return;
    }


    this.registerRequestPayload.name = this.registerForm.get('name').value;
    this.registerRequestPayload.surname = this.registerForm.get('surname').value;
    this.registerRequestPayload.username = this.registerForm.get('username').value;
    this.registerRequestPayload.email = this.registerForm.get('email').value;
    this.registerRequestPayload.address = this.registerForm.get('address').value;
    this.registerRequestPayload.password = this.registerForm.get('password').value;

    this.authService.register(this.registerRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'], {
          queryParams: {registered: 'true'}
        });
        console.log(data);
      }, error => {console.log('Registration Failed! Please try again')
        alert("Registration Failed! Please try again!")}
      );
  }
}
