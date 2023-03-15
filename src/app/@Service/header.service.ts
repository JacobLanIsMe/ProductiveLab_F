import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionDto } from './../@Models/function.model';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }
  getCommonFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetCommonFunctions")
  }
}
