import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hosts } from '../enums/hosts';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private http:HttpClient) {}

  // this method is used for receiving all the unit names from db
  getAllUnits():Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${Hosts.API_HOST}/unit`);
  }
}
