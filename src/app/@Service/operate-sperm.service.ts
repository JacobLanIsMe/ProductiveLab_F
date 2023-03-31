import { SpermFreezeDto } from './../@Models/spermFreezeDto.model';
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
    return this.http.get<BaseOperateSpermInfoDto>("/api/OperateSperm/GetOriginInfoOfSperm", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  addSpermScore(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermScore", form.value);
  }
  // getExistingSpermScore(spermFromCourseOfTreatmentId: string, spermScoreTimePointId: number){
  //   return this.http.get<SpermScoreDto>("/api/OperateSperm/GetExistingSpermScore", {
  //     params: new HttpParams().append("spermFromCourseOfTreatmentId", spermFromCourseOfTreatmentId).append("spermScoreTimePointId", spermScoreTimePointId)
  //   })
  // }
  updateExistingSpermScore(form:FormGroup){
    return this.http.put<BaseResponseDto>("/api/OperateSperm/UpdateExistingSpermScore", form.value);
  }
  getSpermFreezeOperationMethod(){
    return this.http.get<SpermFreezeOperationMethodDto[]>("/api/OperateSperm/GetSpermFreezeOperationMethod");
  }
  addSpermFreeze(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermFreeze", form.value);
  }
  selectSpermFreeze(unitIds: number[]){
    return this.http.put<BaseResponseDto>("/api/OperateSperm/SelectSpermFreeze", unitIds);
  }

  getSpermFreeze(spermFromCourseOfTreatmentId: string){
    return this.http.get<SpermFreezeDto[]>("/api/OperateSperm/GetSpermFreeze",{
      params: new HttpParams().append("spermFromCourseOfTreatmentId", spermFromCourseOfTreatmentId)
    });
  }
}
