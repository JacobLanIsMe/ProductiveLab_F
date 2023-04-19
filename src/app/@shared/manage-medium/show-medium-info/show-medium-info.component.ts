import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-medium-info',
  templateUrl: './show-medium-info.component.html',
  styleUrls: ['./show-medium-info.component.css']
})
export class ShowMediumInfoComponent {
  @Input() medium?:MediumDto;
  
}
