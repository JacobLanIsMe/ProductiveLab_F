import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Common2Dto } from '../@Models/common2Dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getAllEmbryologist(){
    return this.http.get<Common2Dto[]>("/api/EmployeeManager/GetAllEmbryologist");
  }

  getAllDoctor(){
    return this.http.get<Common2Dto[]>("/api/EmployeeManager/GetAllDoctor");
  }
}
