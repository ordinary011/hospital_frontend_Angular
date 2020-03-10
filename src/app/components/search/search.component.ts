import { Component, OnInit } from '@angular/core';
import { DoctorModel } from 'src/app/models/doctorModel';
import { TransferService } from 'src/app/services/transfer.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  doctors:DoctorModel[] = [];
  docName:string;

  constructor(
    private transfer:TransferService,
    private docService:DoctorService
  ) { }

  // this loaded is loaded when somebody make a request for a search by doctor name
  // first it loads data from transfer service, that was transmitted by search input from the header
  async ngOnInit() {
    // first we will get the name of the doctor from the input field in the headers, for that purpose we use transfer service
    await this.transfer.currentDoctorName.subscribe((res:string) => this.docName = res)
    // after name is loaded it makes a request to the backend and searches for doctors
    await this.docService.findDoctorsByName(this.docName).subscribe((res) => this.doctors = res.msg.doctors)
  }

  // if patient found a doctor, he/she can click on the doctor component and it will navigate router to the doctorInfo component. It will also transfer basic information about the doctor.
  goToDoctorInfo(doctor:DoctorModel){
    this.transfer.toDoctorInfo(doctor)
  }

}
