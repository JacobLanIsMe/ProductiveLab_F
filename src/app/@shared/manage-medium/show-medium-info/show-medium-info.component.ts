import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';

@Component({
  selector: 'app-show-medium-info',
  templateUrl: './show-medium-info.component.html',
  styleUrls: ['./show-medium-info.component.css']
})
export class ShowMediumInfoComponent {
  constructor(private manageMediumService:ManageMediumService){}
  @Input() mediums:MediumDto[] = [];
  @Input() index?:number; 
  @Output() close = new EventEmitter<MediumDto>();
  onSelectMedium(medium:MediumDto){
    if(this.index){
      this.manageMediumService.selectedMediumArrar[this.index] = medium;
    }
    else{
      this.manageMediumService.selectedMediumArrar[0] = medium;
    }
    this.manageMediumService.selectedMediums.next(this.manageMediumService.selectedMediumArrar);
    this.close.emit(medium);
  }
}
