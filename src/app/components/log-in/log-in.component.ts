import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private transfer: TransferService
  ) {}

  ngOnInit() {}

  onSubmit(logForm) {
    // check whether form is valid
    if (logForm.invalid) alert('sorry bad input please try again');
    else {
      // if form is valid we send a request to the backend server just to make sure that our patient exists in the db
      this.auth.patientLogIn(logForm.value).subscribe((res: ResponseModel) => {
        if (res.success) {
          // it sends back token which we will then set into the local storage
          localStorage.setItem('token', res.msg.token);
          // then we navigate to the patient component and then we notify the header that the user is logged in so that it will change buttons to log out
          this.router.navigate(['patient']).then(() => {
            this.transfer.toHeader('logged in');
          });
        }
        
      });
    }
  }
}
