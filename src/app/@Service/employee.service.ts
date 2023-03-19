import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmbryologistDto } from '../@Models/embryologistDto.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getAllEmbryologist(){
    return this.http.get<EmbryologistDto[]>("/api/EmployeeManager/GetAllEmbryologist");
  }
}
