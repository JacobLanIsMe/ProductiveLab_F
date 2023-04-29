import { FunctionDto } from './../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subfunction-header',
  templateUrl: './subfunction-header.component.html',
  styleUrls: ['./subfunction-header.component.css']
})
export class SubfunctionHeaderComponent {
  constructor(private functionHeaderService: FunctionHeaderService){}
  @Input() subfunctions: FunctionDto[] = []
  onOpenSubfunction(subfunction: FunctionDto){
    this.functionHeaderService.isOpenSubfunction.next(subfunction);
  }
}
