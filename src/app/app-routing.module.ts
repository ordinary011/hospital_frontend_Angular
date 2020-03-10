import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { UnitComponent } from './components/home/unit/unit.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'unit', component: UnitComponent},
  {path: 'unitInfo', component: UnitInfoComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'doctorInfo', component: DoctorInfoComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
