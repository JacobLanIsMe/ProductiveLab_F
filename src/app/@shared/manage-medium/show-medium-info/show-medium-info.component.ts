import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-medium-info',
  templateUrl: './show-medium-info.component.html',
  styleUrls: ['./show-medium-info.component.css']
})
export class ShowMediumInfoComponent {
  constructor(){}
  @Input() mediums:MediumDto[] = [];
  @Output() close = new EventEmitter<MediumDto>();
  onSelectMedium(medium:MediumDto){
    this.close.emit(medium);
  }
}
