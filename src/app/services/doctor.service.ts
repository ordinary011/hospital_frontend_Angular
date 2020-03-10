import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hosts } from '../enums/hosts';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  findDoctorsInUnit(unit_id: number):Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${Hosts.API_HOST}/unit/${unit_id}`);
  }

  findDoctorInfo(doctor_id: number):Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${Hosts.API_HOST}/doctor/${doctor_id}`)
  }

  findDoctorsByName(docName:string):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${Hosts.API_HOST}/doctor/?name=${docName}`)
  }

}
