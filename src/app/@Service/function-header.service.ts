import { FunctionDto } from '../@Models/functionDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionHeaderService {

  constructor(private http: HttpClient) {}
  commonFunctions: FunctionDto[] = [];
  caseSpecificFunctions: FunctionDto[] = [];
  allFunctions: FunctionDto[] = [];
  subFunctions: FunctionDto[] = [];
  selectedFunction = new Subject<FunctionDto>();
  selectedFunctionDto: FunctionDto | undefined;
  
  isOpenSubfunction = new Subject<FunctionDto|null>();
  isOpenAddCourseOfTreatment = new Subject<boolean>();
  getAllFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetAllFunctions");
  }

  getCurrentFunction(functionUrl: string){
    this.commonFunctions.forEach(x=>{
      if (x.route == functionUrl){
        this.selectedFunction.next(x);
        this.selectedFunctionDto = x;
      }
    })
    this.caseSpecificFunctions.forEach(x=>{
      if (x.route == functionUrl){
        this.selectedFunction.next(x);
        this.selectedFunctionDto = x;
      }
    })
  }

  
}
