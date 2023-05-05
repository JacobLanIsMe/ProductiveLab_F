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
  allSpermScore = new Subject<SpermScoreDto[]>();
  allSpermScoreArray: SpermScoreDto[] = [];
  getOriginInfoOfSperm(courseOfTreatmentId: string){
    return this.http.get<BaseOperateSpermInfoDto>("/api/OperateSperm/GetOriginInfoOfSperm", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  addSpermScore(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/OperateSperm/AddSpermScore", form.value);
  }
  
  getSpermScores(courseOfTreatmentId: string){
    this.http.get<SpermScoreDto[]>("/api/OperateSperm/GetSpermScores", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).subscribe(res=>{
      res.forEach(x=>{
        const index = this.allSpermScoreArray.findIndex(y=>y.spermScoreTimePointId === x.spermScoreTimePointId && y.courseOfTreatmentId === x.courseOfTreatmentId);
        if (index !== -1){
          this.allSpermScoreArray.splice(index, 1);
        }
        this.allSpermScoreArray.push(x);
      })
      this.allSpermScoreArray.sort(function(a, b){
        if (a.courseOfTreatmentSqlId > b.courseOfTreatmentSqlId){
          return 1
        }
        else if (a.courseOfTreatmentSqlId < b.courseOfTreatmentSqlId){
          return -1
        }
        else{
          return a.spermScoreTimePointId - b.spermScoreTimePointId
        }
        
      })
      this.allSpermScore.next(this.allSpermScoreArray);
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
