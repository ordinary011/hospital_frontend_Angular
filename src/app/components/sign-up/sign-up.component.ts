import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private patientService:PatientService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  // here we just need to make sure that our form is valid and then we make a request to the backend server
  onSubmit(regForm) {
    if (regForm.invalid) return alert("sorry the form is not valid can't submit");
    if (regForm.value.password !== regForm.value.passwordConfirm) return alert('could not confirm the password please try again');
    this.patientService.signUp(regForm.value).subscribe((res:ResponseModel) => {
      alert('registered')
      this.router.navigate(['logIn'])
    }) 
  }
}
