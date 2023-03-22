import { BaseResponseDto } from './../@Models/baseResponseDto.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseOperateSpermInfoDto } from '../@Models/baseOperateSpermInfoDto.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OperateSpermService {

  constructor(private http:HttpClient) { }
  baseOperateSpermInfo?: BaseOperateSpermInfoDto
  isOpenSelectSpermFreeze = new Subject<boolean>();
  getOriginInfoOfSperm(courseOfTreatmentId: string){
    return this.http.get<BaseOperateSpermInfoDto>("/api/Treatment/GetOriginInfoOfSperm", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  addSpermScore(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/Treatment/AddSpermScore", form.value);
  }
}
