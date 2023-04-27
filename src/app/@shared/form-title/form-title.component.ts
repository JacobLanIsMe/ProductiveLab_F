import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FunctionDto } from 'src/app/@Models/functionDto.model';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent {
  @Input() subfunction: FunctionDto | null = null;
  @Input() icon: IconProp | null = null;
  @Input() formTitle?: string;
}
