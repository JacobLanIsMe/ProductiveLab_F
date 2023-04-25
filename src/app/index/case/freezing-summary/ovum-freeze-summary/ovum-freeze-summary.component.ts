import { Component, OnInit } from '@angular/core';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-ovum-freeze-summary',
  templateUrl: './ovum-freeze-summary.component.html',
  styleUrls: ['./ovum-freeze-summary.component.css']
})
export class OvumFreezeSummaryComponent implements OnInit {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService){}
  ngOnInit(): void {
    this.freezeSummaryService.ovumFreezeSummary.subscribe(res=>{
      this.ovumFreezeSummary = res;
      this.ovumFreezeSummary.forEach(x=>{
        x.isChecked = false;
      })
    })
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId()
    if (courseOfTreatmentId){
      this.freezeSummaryService.getOvumFreezeSummary(courseOfTreatmentId);
    }
  }
  ovumFreezeSummary:GetOvumFreezeSummaryDto[] = []
  isAllOvumChecked:boolean = false;
  faList = faList;
  onSelectAllOvum(event:any){
    this.ovumFreezeSummary.forEach(x=>{
      x.isChecked = event.target.checked;
    })
  }
  onSelectOneOvum(event:any, unitId:number){
    this.ovumFreezeSummary.forEach(x=>{
      if (x.freezeStorageInfo.unitInfo.storageUnitId === unitId){
        x.isChecked = event.target.checked;
      }
    })
    const index = this.ovumFreezeSummary.findIndex(x=>x.isChecked === false);
    if (index !== -1){
      this.isAllOvumChecked = false;
    }
    else{
      this.isAllOvumChecked = true;
    }
  }
}
