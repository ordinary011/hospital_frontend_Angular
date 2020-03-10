import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { UnitComponent } from './components/home/unit/unit.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { SearchComponent } from './components/search/search.component';
import { CommentComponent } from './components/doctor-info/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent,
    PatientComponent,
    UnitComponent,
    UnitInfoComponent,
    DoctorComponent,
    DoctorInfoComponent,
    SearchComponent,
    CommentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
