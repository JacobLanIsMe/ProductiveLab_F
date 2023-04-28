import { SubfunctionHeaderComponent } from './../../../@shared/subfunction-header/subfunction-header.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
@Component({
  selector: 'app-thaw-ovum',
  templateUrl: './thaw-ovum.component.html',
  styleUrls: ['./thaw-ovum.component.css']
})
export class ThawOvumComponent implements OnInit, OnDestroy {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private functionHeaderService:FunctionHeaderService){}
  ngOnDestroy(): void {
    this.openSubfunctionSubscription?.unsubscribe();
    this.selectedRecipientOvumFreezesSubscription?.unsubscribe();
    this.selectedDonorOvumFreezesSubscription?.unsubscribe();
    this.freezeSummaryService.selectedRecipientOvumFreezeArray.length = 0;
    this.freezeSummaryService.selectedDonorOvumFreezeArray.length = 0;
  }
  ngOnInit(): void {
    if (this.courseOfTreatmentId){
      this.freezeSummaryService.getRecipientOvumFreezes(this.courseOfTreatmentId).subscribe(res=>{
        this.recipientOvumFreezes = res;
      })
    }
    this.openSubfunctionSubscription = this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      if (this.freezeSummaryService.selectedRecipientOvumFreezeArray.length <= 0 && this.freezeSummaryService.selectedDonorOvumFreezeArray.length <= 0){
        this.commonService.showAlertMessage("","請選擇欲解凍的卵子");
        return
      }
      if (this.freezeSummaryService.selectedRecipientOvumFreezeArray.length && this.freezeSummaryService.selectedDonorOvumFreezeArray.length){
        this.commonService.showAlertMessage("","同時選到自己的卵子及精卵庫的卵子")
        return
      }
      this.openSubfunction = res;
    })
    
  }
  openSubfunctionSubscription?:Subscription;
  selectedRecipientOvumFreezesSubscription?:Subscription;
  selectedDonorOvumFreezesSubscription?:Subscription;
  courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
  faListCheck = faListCheck;
  openSubfunction: FunctionDto | null = null;
  recipientOvumFreezes: GetOvumFreezeSummaryDto[] = []
  
  onSelectedRecipientOvumFreezes(event:GetOvumFreezeSummaryDto[]){
    this.freezeSummaryService.selectedRecipientOvumFreezeArray = event
  }
}
