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
  selectedFunction = new Subject<FunctionDto>();
  getCommonFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetCommonFunctions")
  }
  getCaseSpecificFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetCaseSpecificFunctions");
  }
  getCurrentFunction(functionUrl: string){
    this.commonFunctions.forEach(x=>{
      if (x.route == functionUrl){
        this.selectedFunction.next(x);
      }
    })
    this.caseSpecificFunctions.forEach(x=>{
      if (x.route == functionUrl){
        this.selectedFunction.next(x);
      }
    })
  }
}
