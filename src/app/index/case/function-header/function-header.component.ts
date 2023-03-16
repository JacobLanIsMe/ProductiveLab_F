import { MainPageService } from './../../../@Service/main-page.service';
import { FunctionDto } from './../../../@Models/function.model';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/@Service/header.service';

@Component({
  selector: 'app-function-header',
  templateUrl: './function-header.component.html',
  styleUrls: ['./function-header.component.css']
})
export class FunctionHeaderComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private mainPageService: MainPageService, private headerService: HeaderService){}
  
  ngOnInit(): void {
    this.functions = this.functionHeaderService.caseSpecificFunctions;
    this.courseId = this.mainPageService.selectedCourseId;
  }
  functions: FunctionDto[] = [];
  courseId: string = "";
  onSelectFunction(selectedFunction: FunctionDto){
    this.functionHeaderService.selectedFunction.next(selectedFunction);
  }
}
