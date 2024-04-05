import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MuiTopNavigationModule,
} from '@mapp-ui/common';
import {
  MuiFormFieldModule,
  MuiProgressBarModule
} from '@mapp-ui/unify';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './users/user-details.component';
import { AppComponent } from './app.component';
import { Step2Component } from './progress-bar/step2.component';
import { Step1Component } from './progress-bar/step1.component';
import { ProgressBarDemoComponent } from './progress-bar/progress-bar-demo.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
	  HomeComponent,
    LoginComponent,
	  UserDetailsComponent,
	  ProgressBarDemoComponent,
	  Step1Component,
    Step2Component,
  ],
  imports: [
	  NgxMatFileInputModule,
    HttpClientModule,
	  AppRoutingModule,
    MatCardModule,
	  FormsModule,
	  ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
	  MuiProgressBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MuiFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatLuxonDateModule,
    MuiTopNavigationModule,
  ],
  providers: [
   { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
