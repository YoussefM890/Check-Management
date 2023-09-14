import {Routes} from "@angular/router";
import {ChecksComponent} from "./app/checks/checks.component";
import {LoginComponent} from "./app/login/login.component";
import {AuthGuard} from "./app/helpers/guards/auth.guard";
import {UserRoles} from "./app/models/enums/user_roles";
import {LoginGuard} from "./app/helpers/guards/login.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: ChecksComponent,
    canActivate: [AuthGuard],
    data: {permittedRoles: [UserRoles.Admin, UserRoles.User]}
  },
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: '/home'},
]
