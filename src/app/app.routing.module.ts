import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import { AuthGuard } from './service/auth/auth-guard.service';
import {NewCVComponent} from "./new-cv/new-cv.component";
import {CustomSectionsComponent} from "./custom-sections/custom-sections.component";
import {PaypalComponent} from "./paypal/paypal.component";
import {AllCustomComponent} from "./all-custom/all-custom.component";
import {AllCustomStepperComponent} from "./all-custom-stepper/all-custom-stepper.component";
import {CustomTemplateComponent} from "./custom-template/custom-template.component";
import {TemplateComponent} from "./templates/template/template.component";

const routes : Routes = [
  { path:'', component:HomeComponent, canActivate: [AuthGuard] },
  { path:'login', component:LoginComponent },
  { path:'logout', component:LogoutComponent },
  { path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  { path:'registration', component:RegistrationComponent},
  { path:'demoCV', component:NewCVComponent, canActivate: [AuthGuard]},
  { path:'customDemoCV', component:CustomSectionsComponent, canActivate: [AuthGuard]},
  { path:'paypal', component:PaypalComponent, canActivate: [AuthGuard]},
  { path:'createTemplate', component:AllCustomComponent, canActivate: [AuthGuard]},
  { path:'allCustomStepper', component:AllCustomStepperComponent, canActivate: [AuthGuard]},
  { path:'templates', component:CustomTemplateComponent, canActivate: [AuthGuard]},
  { path:'cvExamples', component:TemplateComponent, canActivate: [AuthGuard]},
  { path:'**', component:HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{


}
