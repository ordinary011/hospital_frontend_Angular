import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnitModel } from '../models/unitModel';
import { DoctorModel } from '../models/doctorModel';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  // this subject is used in order to make header reload when logIn button is clicked
  private msgSource = new BehaviorSubject<string>('default');
  telecast = this.msgSource.asObservable();

  
  private doctorNameSource = new BehaviorSubject('default');
  currentDoctorName = this.doctorNameSource.asObservable();

  private unitSource = new BehaviorSubject({ id: 1, unit: 'default' });
  currentUnit = this.unitSource.asObservable();

  private doctorSource = new BehaviorSubject({
    id: 1111111,
    name: 'default',
    lastName: 'default',
    occupation: 'default',
    period_of_service: 1,
    phone_number: 11111111,
    email: 'default@gmail.com',
    floor: 1,
    office: 111,
    unit_id: 1
  });
  currentDoctor = this.doctorSource.asObservable();

  constructor() {}

  toUnitInfo(unit: UnitModel) {
    this.unitSource.next(unit);
  }

  toDoctorInfo(doctor: DoctorModel){
    this.doctorSource.next(doctor)
  }

  toDoctorSearch(doctorName:string){
    this.doctorNameSource.next(doctorName)
  }

  toHeader(msg:string) {
    this.msgSource.next(msg);
  }


}
