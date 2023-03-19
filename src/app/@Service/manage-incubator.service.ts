import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncubatorDto } from '../@Models/incubatorDto.model';

@Injectable({
  providedIn: 'root'
})
export class ManageIncubatorService {

  constructor(private http:HttpClient) { }
  getAllIncubator(){
    return this.http.get<IncubatorDto>("/api/IncubatorManager/GetAllIncubator");
  }
}
