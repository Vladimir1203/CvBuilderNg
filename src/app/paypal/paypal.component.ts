import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import {LocalStorageService} from "ngx-webstorage";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {AuthenticationService} from "../service/auth/authentication.service";


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  registerRequestPayload: RegisterRequestPayload;
  constructor(private localStorage: LocalStorageService,private authService: AuthenticationService) {
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
    render(
      {id: "#myPaypalButtons",
        currency: "USD",
        value: "9.99",
        onApprove :(details => {this.savePremiumInDatabase()}) }
    );
  }

  savePremiumInDatabase(){
    this.registerRequestPayload.username = this.localStorage.retrieve('username');

    console.log(this.registerRequestPayload.username)
    this.authService.savePremium(this.registerRequestPayload)
    this.authService.ispremiumuser = true
  }
}
