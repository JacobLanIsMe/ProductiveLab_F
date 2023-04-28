import { SubfunctionHeaderComponent } from './../../../@shared/subfunction-header/subfunction-header.component';
import { Component, OnInit } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
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
export class ThawOvumComponent implements OnInit {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private functionHeaderService:FunctionHeaderService){}
  ngOnInit(): void {
    if (this.courseOfTreatmentId){
      this.freezeSummaryService.getRecipientOvumFreezes(this.courseOfTreatmentId).subscribe(res=>{
        this.recipientOvumFreezes = res;
      })
    }
    this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      this.openSubfunction = res;
    })
  }
  courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
  faListCheck = faListCheck;
  openSubfunction: FunctionDto | null = null;
  recipientOvumFreezes: GetOvumFreezeSummaryDto[] = []
  isAllOvumChecked = false;
  onSelectAllOvum(event:any){
    this.recipientOvumFreezes.forEach(x=>{
      x.isChecked = event.target.checked;
    })
  }
  onSelectOneOvum(event:any, storageUnitId:number){
    this.freezeSummaryService.checkOvumsOnSameTop(event, storageUnitId, this.recipientOvumFreezes)
    const index = this.recipientOvumFreezes.findIndex(x=>!x.isChecked);
    this.isAllOvumChecked = index === -1 ? true : false
  }
}
