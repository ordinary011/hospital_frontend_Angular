import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { UnitModel } from 'src/app/models/unitModel';
import { TransferService } from "../../services/transfer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // unit component here serves like a label, it just notifies parent component which unit was clicked. unitInfo component includes all the doctors in the unit

  units:UnitModel[] = [];

  constructor(
    private unitService:UnitService,
    private transfer:TransferService
  ) { }

  // on init we get list of units from the unit table in our db
  ngOnInit() {
    this.unitService.getAllUnits().subscribe((res:ResponseModel) => {
      this.units = res.msg.units;
    })
  }

  // when user clicks on one of the components we transfer data about the unit to the unitInfo component
  showUnitInfo(unit:UnitModel){
    this.transfer.toUnitInfo(unit)
  }

}
