import { Component, OnInit} from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { UnitModel } from 'src/app/models/unitModel';
import { DoctorModel } from 'src/app/models/doctorModel';
import { DoctorService } from 'src/app/services/doctor.service';
import { ResponseModel } from 'src/app/models/responseModel';


@Component({
  selector: 'app-unit-info',
  templateUrl: './unit-info.component.html',
  styleUrls: ['./unit-info.component.css']
})
export class UnitInfoComponent implements OnInit {

  // this component contains info about the chosen hospital Unit. it also includes information about the doctors that work here. 

  message:UnitModel;
  doctors:DoctorModel[];
  doctor:DoctorModel;

  constructor(
    private transfer:TransferService,
    private doctorService:DoctorService
  ) { }

  async ngOnInit() {
    // when this component is loaded we will get data about the unit that was clicked on the main page. this is done through transfer service. 
    //1) we receive info about the clicked unit that is transmitted from home Component
    await this.transfer.currentUnit.subscribe((res:UnitModel) => this.message = res)
    // then we search for all the doctors of the specified unit in the db
    await this.doctorService.findDoctorsInUnit(this.message.id).subscribe((res:ResponseModel) => this.doctors = res.msg.doctors)
  }
  
  // this will transfer information about the doctor from this unitInfo component to the doctorInfo Component
  goToDoctorInfo(doctor:DoctorModel){
    this.transfer.toDoctorInfo(doctor)
  }

}
