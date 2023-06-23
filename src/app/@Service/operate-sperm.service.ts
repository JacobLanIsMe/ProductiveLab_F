import { SpermFreezeDto } from './../@Models/spermFreezeDto.model';
import { BaseResponseDto } from './../@Models/baseResponseDto.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpermScoreDto } from '../@Models/spermScoreDto.model';
import { CommonDto } from '../@Models/commonDto.model';

@Injectable({
  providedIn: 'root'
})
export class OperateSpermService {

  constructor(private http:HttpClient) { }
  isOpenSelectSpermFreeze = new Subject<boolean>();
  allSpermScore = new Subject<SpermScoreDto[]>();
  hasSpermFreeze = new Subject<boolean>();
  addSpermScore(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermScore", form.value);
  }
  getSpermScores(courseOfTreatmentId: string){
    this.http.get<SpermScoreDto[]>("/api/OperateSperm/GetSpermScores", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).subscribe(res=>{
      this.allSpermScore.next(res);
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
  getSpermFreeze(customerSqlId: number){
    return this.http.get<SpermFreezeDto[]>("/api/OperateSperm/GetSpermFreeze",{
      params: new HttpParams().append("customerSqlId", customerSqlId)
    });
  }
  getSpermThawMethods(){
    return this.http.get<CommonDto[]>("/api/OperateSperm/GetSpermThawMethods");
  }
  addSpermThaw(form:FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermThaw", form.value)
  }
  hasSpermFreezeByCourseOfTreatmentId(courseOfTreatmentId: string){
    this.http.get<boolean>("api/OperateSperm/HasSpermFreezeByCourseOfTreatmentId", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).subscribe(res=>{
      this.hasSpermFreeze.next(res);
    })
  }
}
