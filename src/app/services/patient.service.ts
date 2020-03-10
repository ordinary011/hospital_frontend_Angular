import { Injectable } from '@angular/core';
import { signUpModel } from '../models/signUpModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { Hosts } from '../enums/hosts';
import { Observable } from 'rxjs';
import { AppreciateModel } from '../models/appreciateModel';
import { reqBodyModel } from '../models/reqBodyModel';
import { CommentModel } from '../models/commentModel';


// httpHeader = header only with a content type
const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {}

  signUp(signUpForm: signUpModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${Hosts.API_HOST}/patient`, signUpForm, httpHeader);
  }

  appreciateDoctor(appreciation:AppreciateModel): Observable<ResponseModel> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
    return this.http.post<ResponseModel>(`${Hosts.API_HOST}/patient/appreciate`, appreciation, { headers });
  }

  addComment(reqBody:reqBodyModel): Observable<ResponseModel>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
    return this.http.post<ResponseModel>(`${Hosts.API_HOST}/patient/comment`, reqBody, { headers })
  }

  delComment(comment:CommentModel): Observable<ResponseModel>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
    return this.http.delete<ResponseModel>(`${Hosts.API_HOST}/patient/comment/${comment.id}/${comment.patient_id}`, { headers })
  }

  updateComment(commentToUpdate:CommentModel): Observable<ResponseModel>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
    const {id: comment_id, patient_id, comment} = commentToUpdate;
    const reqBody = {comment_id, patient_id, comment}
    return this.http.put<ResponseModel>(`${Hosts.API_HOST}/patient/comment`, reqBody, { headers })
  }


}
