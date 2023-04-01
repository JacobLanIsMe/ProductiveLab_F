import { MediumDto } from './../@Models/mediumDto.model';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManageMediumService {

  constructor(private http: HttpClient) { }
  addMedium(mediumForm: FormGroup){
    return this.http.post<BaseResponseDto>("/api/MediumManager/AddMedium", mediumForm.value);
  }
  getInUseMedium(mediumType: number){
    return this.http.get<MediumDto>("/api/MediumManager/GetInUseMedium", {
      params: new HttpParams().append("mediumType", mediumType)
    });
  }
  deleteMediumFromFormArray(formArray: FormArray, index: number){
    if (formArray.controls.length<=1){
      return;
    }
    else{
      formArray.removeAt(index);
    }
  }
}
