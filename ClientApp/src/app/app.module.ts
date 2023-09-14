import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ChecksComponent} from './checks/checks.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AddCheckComponent} from './checks/add-check/add-check.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ImportChecksComponent} from './checks/import-checks/import-checks.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {ConfirmDeleteComponent} from './confirm-delete/confirm-delete.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from "./helpers/interceptors/auth.interceptor";
import {UnauthorizedInterceptor} from "./helpers/interceptors/unauthorized.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ChecksComponent,
    AddCheckComponent,
    ImportChecksComponent,
    ConfirmDeleteComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 5000, // Display time for each toast (in milliseconds)
      positionClass: 'toast-top-right', // Position of the toast on the screen
      closeButton: true, // Show a close button on each toast
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    MatGridListModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
