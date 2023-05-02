import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonDto } from '../@Models/commonDto.model';
import { FormGroup } from '@angular/forms';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  getGenders(){
    return this.http.get<CommonDto[]>("/api/Admin/GetGenders")
  }
  addCustomer(form:FormGroup){
    return this.http.post<BaseResponseDto>("/api/Admin/AddCustomer", form.value);
  }
}
