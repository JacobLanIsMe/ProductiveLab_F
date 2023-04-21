import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { Component, Input, OnInit } from '@angular/core';
import { MediumDto } from 'src/app/@Models/mediumDto.model';

@Component({
  selector: 'app-medium-input',
  templateUrl: './medium-input.component.html',
  styleUrls: ['./medium-input.component.css']
})
export class MediumInputComponent implements OnInit {
  constructor(private manageMediumService:ManageMediumService){}
  ngOnInit(): void {
    
  }
  @Input() mediums:MediumDto[] = [];
  @Input() index:number = 0;
  getSelectedMedium(){
    if (this.manageMediumService.selectedMediumArray.length >= this.index + 1){
      return this.manageMediumService.selectedMediumArray[this.index].name;
    }
    else{
      return "";
    }
  }
  
  onOpenMediumInfo(mediums:MediumDto[], event:MouseEvent){
    this.manageMediumService.openShowMediumInfo(mediums, event, this.index);
  }
}
