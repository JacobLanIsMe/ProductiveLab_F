import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { BaseTreatmentInfoDto } from '../@Models/baseTreatmentInfoDto.model';
import { TreatmentSummaryDto } from '../@Models/treatmentSummaryDto.model';
import { TreatmentDto } from '../@Models/treatmentDto.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http:HttpClient, private route: ActivatedRoute) { }
  addOvumPickupNote(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/Treatment/AddOvumPickupNote", form.value);
  }
  getBaseTreatmentInfo(courseOfTreatmentId:string){
    return this.http.get<BaseTreatmentInfoDto>("/api/Treatment/GetBaseTreatmentInfo", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).pipe(map(res=>{
      if (res.spouseSqlId == 6){
        res.spouseSqlId = null
      }
      return res;
    }))
  }
  getTreatmentSummary(courseOfTreatmentId:string){
    return this.http.get<TreatmentSummaryDto[]>("/api/Treatment/GetTreatmentSummary", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).pipe(map(res=>{
      res.forEach(x=>{
        x.isChecked = false;
      })
      return res;
    }))
  }
  isAllTreatmentSummaryChecked(treatmentSummarys: TreatmentSummaryDto[]){
    let arr = treatmentSummarys.filter(x=>x.isChecked === false);
    if (arr.length > 0){
      return false;
    }
    else{
      return true;
    }
  }
  getCurrentCourseOfTreatmentId(){
    let id;
    let idSubscription = this.route.paramMap.subscribe(params=>{
      id = params.get("id");
    })
    idSubscription.unsubscribe();
    return id;
  }
  getAllTreatment(){
    return this.http.get<TreatmentDto[]>("/api/Treatment/GetAllTreatment");
  }
  addCourseOfTreatment(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/Treatment/AddCourseOfTreatment", form.value);
  }
}
