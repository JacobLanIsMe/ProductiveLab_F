import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetOvumFreezeSummaryDto } from '../@Models/getOvumFreezeSummaryDto.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreezeSummaryService {

  constructor(private http:HttpClient) { }
  ovumFreezeSummarys = new Subject<GetOvumFreezeSummaryDto[]>();
  getOvumFreezeSummarys(courseOfTreatmentId:string){
    this.http.get<GetOvumFreezeSummaryDto[]>("/api/FreezeSummary/GetOvumFreezeSummary", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).subscribe(res=>{
      this.ovumFreezeSummarys.next(res);
    })
  }
}
