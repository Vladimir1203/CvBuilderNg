import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TemplateComponent} from "./templates/template/template.component";
import { AuthGuard } from './service/auth/auth-guard.service';
import {NewCVComponent} from "./new-cv/new-cv.component";
import {CustomSectionsComponent} from "./custom-sections/custom-sections.component";

const routes : Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'logout', component:LogoutComponent },
  { path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  { path:'registration', component:RegistrationComponent},
  { path:'templates', component:TemplateComponent, canActivate: [AuthGuard]},
  { path:'newCV', component:NewCVComponent, canActivate: [AuthGuard]},
  { path:'customSections', component:CustomSectionsComponent, canActivate: [AuthGuard]},
  { path:'**', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{


}
