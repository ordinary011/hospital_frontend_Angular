import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseModel } from 'src/app/models/responseModel';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  name: string;
  isTokenPresent: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isTokenPresent = true;
      // patientVerify service will add token from the local storage as a header (see patientVerifyService) as a result we will get a name of the user
      this.auth.patientVerify().subscribe((res: ResponseModel) => {
        this.name = res.msg.verifiedToken.name;
      });
    } 
  }
}
