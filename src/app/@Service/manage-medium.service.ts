import { BaseResponseDto } from './../@Models/baseResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManageMediumService {

  constructor(private http: HttpClient) { }
  addMedium(mediumForm: FormGroup){
    return this.http.post<BaseResponseDto>("/api/MediumManager/AddMedium", mediumForm.value);
  }
}
