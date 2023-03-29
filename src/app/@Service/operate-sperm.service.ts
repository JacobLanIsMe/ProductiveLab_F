import { BaseResponseDto } from './../@Models/baseResponseDto.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseOperateSpermInfoDto } from '../@Models/baseOperateSpermInfoDto.model';
import { FormGroup } from '@angular/forms';
import { SpermScoreDto } from '../@Models/spermScoreDto.model';
import { SpermFreezeOperationMethodDto } from '../@Models/spermFreezeOperationMethodDto.model';

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
  getExistingSpermScore(spermFromCourseOfTreatmentId: string, spermScoreTimePointId: number){
    return this.http.get<SpermScoreDto>("/api/Treatment/GetExistingSpermScore", {
      params: new HttpParams().append("spermFromCourseOfTreatmentId", spermFromCourseOfTreatmentId).append("spermScoreTimePointId", spermScoreTimePointId)
    })
  }
  updateExistingSpermScore(form:FormGroup){
    return this.http.put<BaseResponseDto>("/api/Treatment/UpdateExistingSpermScore", form.value);
  }
  getSpermFreezeOperationMethod(){
    return this.http.get<SpermFreezeOperationMethodDto[]>("/api/Treatment/GetSpermFreezeOperationMethod");
  }
  addSpermFreeze(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/Treatment/AddSpermFreeze", form.value);
  }
}
