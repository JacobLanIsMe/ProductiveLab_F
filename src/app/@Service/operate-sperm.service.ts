import { CommonService } from './common.service';
import { SpermFreezeDto } from './../@Models/spermFreezeDto.model';
import { BaseResponseDto } from './../@Models/baseResponseDto.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseOperateSpermInfoDto } from '../@Models/baseOperateSpermInfoDto.model';
import { FormGroup } from '@angular/forms';
import { SpermScoreDto } from '../@Models/spermScoreDto.model';
import { CommonDto } from '../@Models/commonDto.model';

@Injectable({
  providedIn: 'root'
})
export class OperateSpermService {

  constructor(private http:HttpClient) { }
  baseOperateSpermInfo?: BaseOperateSpermInfoDto
  isOpenSelectSpermFreeze = new Subject<boolean>();
  currentSpermScores = new Subject<SpermScoreDto[]>();
  currentSpermScoreArray: SpermScoreDto[] = [];
  previousSpermScoreArray: SpermScoreDto[] = [];
  getOriginInfoOfSperm(courseOfTreatmentId: string){
    return this.http.get<BaseOperateSpermInfoDto>("/api/OperateSperm/GetOriginInfoOfSperm", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  addSpermScore(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermScore", form.value);
  }
  
  getSpermScores(courseOfTreatmentId: string){
    return this.http.get<SpermScoreDto[]>("/api/OperateSperm/GetSpermScore", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  getCurrentSpermScores(courseOfTreatmentId: string){
    this.getSpermScores(courseOfTreatmentId).subscribe(res=>{
      this.currentSpermScoreArray = res;
      this.currentSpermScores.next(res);
    })
  }
  updateExistingSpermScore(form:FormGroup){
    return this.http.put<BaseResponseDto>("/api/OperateSperm/UpdateExistingSpermScore", form.value);
  }
  getSpermFreezeOperationMethod(){
    return this.http.get<CommonDto[]>("/api/OperateSperm/GetSpermFreezeOperationMethod");
  }
  addSpermFreeze(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermFreeze", form.value);
  }
  getSpermFreeze(spermFromCourseOfTreatmentId: string){
    return this.http.get<SpermFreezeDto[]>("/api/OperateSperm/GetSpermFreeze",{
      params: new HttpParams().append("spermFromCourseOfTreatmentId", spermFromCourseOfTreatmentId)
    });
  }
  getSpermThawMethods(){
    return this.http.get<CommonDto[]>("/api/OperateSperm/GetSpermThawMethods");
  }
  addSpermThaw(form:FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermThaw", form.value)
  }
}
