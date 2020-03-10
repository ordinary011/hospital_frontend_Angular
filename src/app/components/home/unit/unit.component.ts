import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnitModel } from 'src/app/models/unitModel';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  // unit component here serves like a label, it just notifies parent component which unit was clicked. unitInfo component includes all the doctors in the unit

  @Input() unitInput:UnitModel;
  @Output() showUnitInfo = new EventEmitter()

  constructor() { }

  ngOnInit() {
    
  }

  // when user click on one of the units it notifies the father which one was clicked
  // then father component will transfer data about the component that was clicked to the UnitInfo component where all the doctors of the unit will be displayed
  goToInfo(){
    this.showUnitInfo.emit(this.unitInput)
  }

}
