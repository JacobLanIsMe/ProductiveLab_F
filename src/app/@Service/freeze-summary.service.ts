import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetOvumFreezeSummaryDto } from '../@Models/getOvumFreezeSummaryDto.model';

@Injectable({
  providedIn: 'root'
})
export class FreezeSummaryService {

  constructor(private http:HttpClient) { }
  getOvumFreezeSummary(courseOfTreatmentId:string){
    return this.http.get<GetOvumFreezeSummaryDto>("/api/FreezeSummary/GetOvumFreezeSummary", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
}
