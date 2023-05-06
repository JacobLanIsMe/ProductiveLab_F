import { Component, OnDestroy, OnInit } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
@Component({
  selector: 'app-thaw-embryo',
  templateUrl: './thaw-embryo.component.html',
  styleUrls: ['./thaw-embryo.component.css']
})
export class ThawEmbryoComponent implements OnInit, OnDestroy {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private functionHeaderService:FunctionHeaderService){}
  ngOnDestroy(): void {
    this.embryoFreezesSubscription?.unsubscribe();
    this.subfunctionSubscription?.unsubscribe();
    this.freezeSummaryService.selectedRecipientOvumFreezeArray.length = 0;
  }
  ngOnInit(): void {
     this.embryoFreezesSubscription = this.freezeSummaryService.embryoFreezes.subscribe(res=>{
      this.isLoading = false;
      if (res.length <= 0){
        this.embryoFreezesResult = "查無相關資訊";
      }
      else{
        this.embryoFreezesResult = undefined;
        this.embryoFreezes = res
      }
    })
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.freezeSummaryService.getEmbryoFreezes(courseOfTreatmentId);
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.thawEmbryo).subscribe(res=>{
      this.subfunctions = res;
    })
    this.subfunctionSubscription = this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      this.isOpenSubfunction = res;
    })
  }
  embryoFreezesSubscription?:Subscription;
  subfunctionSubscription?:Subscription;
  embryoFreezes: GetOvumFreezeSummaryDto[] = [];
  subfunctions: FunctionDto[] = [];
  isOpenSubfunction: FunctionDto | null = null;
  faListCheck=faListCheck;
  isAllOvumChecked: boolean = false;
  embryoFreezesResult?: string;
  isLoading = true;
  onSelectAllOvum(event:any){
    this.embryoFreezes.forEach(x=>{
      x.isChecked = event.target.checked;
    })
    this.freezeSummaryService.selectedRecipientOvumFreezeArray = this.embryoFreezes.filter(x=>x.isChecked);
  }
  onSelectOneOvum(event:any, unitId:number){
    this.freezeSummaryService.checkOvumsOnSameTop(event, unitId, this.embryoFreezes);
    const index = this.embryoFreezes.findIndex(x=>!x.isChecked);
    this.isAllOvumChecked = index === -1 ? true : false;
    this.freezeSummaryService.selectedRecipientOvumFreezeArray = this.embryoFreezes.filter(x=>x.isChecked);
  }
}
