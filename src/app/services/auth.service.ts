import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hosts } from '../enums/hosts';
import { ResponseModel } from '../models/responseModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { logInModel } from '../models/logInmodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // as soon as user logs in the token of the user is verified and info about the user is set to this patientDetails subject
  // when user logsOut the value of the subject is set to {}
  patientDetails = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  patientLogIn(logInForm: logInModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${Hosts.API_HOST}/patient/logIn`, logInForm, httpOptions);
  }

  patientVerify(): Observable<ResponseModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.get<ResponseModel>(`${Hosts.API_HOST}/patient/verify`, { headers });
  }
}
