import { MainPageService } from './../../../@Service/main-page.service';
import { FunctionDto } from '../../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-header',
  templateUrl: './function-header.component.html',
  styleUrls: ['./function-header.component.css']
})
export class FunctionHeaderComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private mainPageService: MainPageService){}
  
  ngOnInit(): void {
    this.functions = this.functionHeaderService.caseSpecificFunctions;
    this.courseId = this.mainPageService.selectedCourseId;
  }
  functions: FunctionDto[] = [];
  courseId: string = "";
}
