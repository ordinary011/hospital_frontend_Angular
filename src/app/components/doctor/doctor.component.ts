import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DoctorModel } from '../../models/doctorModel';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  // this component is kind of like a label for a doctor. it just represents basic info about the doctor and it navigates to the doctorInfo component where more detailed information about the current doctor can be found

  @Input() doctorInput:DoctorModel;
  @Output() goToDoctorInfo = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  // this method is used for letting know the father component which exactly doctor component has been clicked, later father component will transfer information about this doctor to the doctorInfo component and doctorInfo will load the data about the doctor that was clicked
  showDetails(){
    this.goToDoctorInfo.emit(this.doctorInput)
  }

}
