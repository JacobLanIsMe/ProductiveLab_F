import { FunctionDto } from '../@Models/functionDto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionHeaderService{

  constructor(private http: HttpClient) {}
 
  commonFunctions: FunctionDto[] = [];
  caseSpecificFunctions: FunctionDto[] = [];
  
  isOpenSubfunction = new Subject<FunctionDto|null>();
  isOpenAddCourseOfTreatment = new Subject<boolean>();
  getAllFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetAllFunctions");
  }
  getSubfunctions(functionId:number){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetSubfunctions",{
      params:new HttpParams().append("functionId", functionId)
    });
  }
  
}
