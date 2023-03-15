import { FunctionDto } from './../@Models/function.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionHeaderService {

  constructor(private http: HttpClient) { }
  selectedFunctionName = new Subject<string>();
  getFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetFunctions");
  }
}
