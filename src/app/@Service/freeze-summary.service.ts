import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetOvumFreezeSummaryDto } from '../@Models/getOvumFreezeSummaryDto.model';
import { Subject } from 'rxjs';
import { GetSpermFreezeSummaryDto } from '../@Models/getSpermFreezeSummaryDto.model';

@Injectable({
  providedIn: 'root'
})
export class FreezeSummaryService {

  constructor(private http:HttpClient) { }
  ovumFreezeSummary = new Subject<GetOvumFreezeSummaryDto[]>();
  selectedRecipientOvumFreezeArray: GetOvumFreezeSummaryDto[] = [];
  selectedDonorOvumFreezeArray: GetOvumFreezeSummaryDto[] = [];
  getOvumFreezeSummary(courseOfTreatmentId:string){
    this.http.get<GetOvumFreezeSummaryDto[]>("/api/FreezeSummary/GetOvumFreezeSummary", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    }).subscribe(res=>{
      this.ovumFreezeSummary.next(res);
    })
  }
  getSpermFreezeSummary(courseOfTreatmentId:string){
    return this.http.get<GetSpermFreezeSummaryDto[]>("/api/FreezeSummary/GetSpermFreezeSummary", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  getRecipientOvumFreezes(courseOfTreatmentId:string){
    return this.http.get<GetOvumFreezeSummaryDto[]>("/api/FreezeSummary/GetRecipientOvumFreezes", {
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  checkOvumsOnSameTop(event:any, storageUnitId:number,freezeSummaryArray:GetOvumFreezeSummaryDto[]){
    freezeSummaryArray.forEach(x=>{
      if (x.freezeStorageInfo.unitInfo.storageUnitId === storageUnitId){
        x.isChecked = event.target.checked
      }
    })
  }
  getDonorOvumFreezes(keyword:number){
    return this.http.get<GetOvumFreezeSummaryDto[]>("/api/FreezeSummary/GetDonorOvumFreezes", {
      params: new HttpParams().append("customerSqlId", keyword)
    })
  }
}
