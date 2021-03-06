import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { LogoutComponent } from './logout/logout.component';
import {AlertModule} from "ngx-bootstrap/alert";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomeComponent } from './home/home.component';
import { TemplateComponent } from './templates/template/template.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./service/auth/auth-guard.service";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { NewCVComponent } from './new-cv/new-cv.component';
import {MatStepperModule} from "@angular/material/stepper";
import { CustomSectionsComponent } from './custom-sections/custom-sections.component';
import {MatIconModule} from "@angular/material/icon";
import { PaypalComponent } from './paypal/paypal.component';
import { AllCustomComponent } from './all-custom/all-custom.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AllCustomStepperComponent } from './all-custom-stepper/all-custom-stepper.component';
import { CustomTemplateComponent } from './custom-template/custom-template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent,
    FooterComponent,
    LogoutComponent,
    HomeComponent,
    TemplateComponent,
    NewCVComponent,
    CustomSectionsComponent,
    PaypalComponent,
    AllCustomComponent,
    AllCustomStepperComponent,
    CustomTemplateComponent,

  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AlertModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        MatStepperModule,
        MatIconModule,
        MatCheckboxModule,
    ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
