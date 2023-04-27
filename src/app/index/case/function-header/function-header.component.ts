import { FunctionDto } from '../../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@Service/common.service';

@Component({
  selector: 'app-function-header',
  templateUrl: './function-header.component.html',
  styleUrls: ['./function-header.component.css']
})
export class FunctionHeaderComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private commonService:CommonService){}
  
  ngOnInit(): void {
    this.functions = this.functionHeaderService.caseSpecificFunctions;
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.courseId = courseOfTreatmentId;
    }
  }
  functions: FunctionDto[] = [];
  courseId: string ="";
  onMouseEnter(event:any){
    event.target.classList.add('mouseEnter');
  }
  onMouseLeave(event:any){
    event.target.classList.remove('mouseEnter');
  }
}
