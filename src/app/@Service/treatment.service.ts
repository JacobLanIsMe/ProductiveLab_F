import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { BaseTreatmentInfoDto } from '../@Models/baseTreatmentInfoDto.model';
import { TreatmentSummaryDto } from '../@Models/treatmentSummaryDto.model';
import { TreatmentDto } from '../@Models/treatmentDto.model';
import { Subject, map } from 'rxjs';
import { BaseCustomerInfoDto } from '../@Models/baseCustomerInfoDto.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  constructor(private http:HttpClient, private route: ActivatedRoute) { }
  baseTreatmentInfo?: BaseTreatmentInfoDto;
  selectedOvumPickupDetailId:string[] = [];
  treatmentSummary = new Subject<TreatmentSummaryDto[]>();
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
  updateTreatmentSummary(courseOfTreatmentId:string){
    this.getTreatmentSummary(courseOfTreatmentId).subscribe(res=>{
      this.treatmentSummary.next(res);
    })
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
  addOvumFreeze(form:FormGroup){
    return this.http.post<BaseResponseDto>("/api/Treatment/AddOvumFreeze", form.value);
  }
  getOvumOwnerInfo(courseOfTreatmentId:string){
    return this.http.get<BaseCustomerInfoDto>("/api/Treatment/GetOvumOwnerInfo", {
      params: new HttpParams().append("courseOfTreatmentId",courseOfTreatmentId)
    })
  }
}
