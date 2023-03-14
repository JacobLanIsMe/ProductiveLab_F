import { faCoffee, faShirt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FunctionDto } from './../@Models/function.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionHeaderService {

  constructor(private http: HttpClient) { }

  functionIcons: {} = 
    { "faCoffee": faCoffee, "faShirt":faShirt }
  
  
  getFunctions(){
    return this.http.get<FunctionDto[]>("/api/FunctionManager/GetFunctions");
  }
}
