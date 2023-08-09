import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
@Component({
  selector: 'app-ovum-freeze-summary',
  templateUrl: './ovum-freeze-summary.component.html',
  styleUrls: ['./ovum-freeze-summary.component.css']
})
export class OvumFreezeSummaryComponent implements OnInit, OnDestroy {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.ovumFreezeSummarySubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.ovumFreezeSummarySubscription = this.freezeSummaryService.ovumFreezeSummary.subscribe(res=>{
      this.isLoading = false;
      if (res.length <= 0){
        this.ovumFreezeResult = "查無相關資料"
      }
      else{
        this.ovumFreezeSummary = res;
        this.ovumFreezeSummary.forEach(x=>{
          x.isChecked = false;
        })
      }
    })
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId()
    if (courseOfTreatmentId){
      this.freezeSummaryService.getOvumFreezeSummary(courseOfTreatmentId);
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.freezingSummary).subscribe(res => {
      this.subfunctions = res.filter(x=>(x.functionId == FunctionEnum.changeOvumStorageLocation || x.functionId == FunctionEnum.ovumTransferOutFromFreezing || x.functionId == FunctionEnum.discardOvum));
    })
  }
  ovumFreezeSummarySubscription?:Subscription;
  ovumFreezeSummary:GetOvumFreezeSummaryDto[] = []
  isAllOvumChecked:boolean = false;
  faList = faList;
  isLoading = true;
  ovumFreezeResult = "";
  subfunctions: FunctionDto[] = [];
  onSelectAllOvum(event:any){
    this.ovumFreezeSummary.forEach(x=>{
      x.isChecked = event.target.checked;
    })
  }
  onSelectOneOvum(event:any, storageUnitId:number){
    this.freezeSummaryService.checkOvumsOnSameTop(event, storageUnitId, this.ovumFreezeSummary)
    const index = this.ovumFreezeSummary.findIndex(x=>x.isChecked === false);  
    this.isAllOvumChecked = index === -1 ? true : false;
  }
}
