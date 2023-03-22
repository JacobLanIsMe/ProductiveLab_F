import { FunctionDto } from './../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subfunction-header',
  templateUrl: './subfunction-header.component.html',
  styleUrls: ['./subfunction-header.component.css']
})
export class SubfunctionHeaderComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService){}
  ngOnInit(): void {
    if (this.functionHeaderService.selectedFunctionDto){
      this.subfunctions = this.functionHeaderService.selectedFunctionDto.subFunctions;
    }
  }
  subfunctions: FunctionDto[] = []
  onOpenSubfunction(subfunction: FunctionDto){
    this.functionHeaderService.isOpenSubfunction.next(subfunction);
  }
}
