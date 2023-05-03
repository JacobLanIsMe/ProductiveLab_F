import { Subscription } from 'rxjs';
import { TreatmentService } from './../../../@Service/treatment.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit, OnDestroy {
  constructor(private treatmentService: TreatmentService, private functionHeaderService: FunctionHeaderService, private commonService:CommonService, private freezeSummaryService:FreezeSummaryService){}
  ngOnDestroy(): void {
    this.treatmentService.selectedOvumDetails.length = 0;
  }
  ngOnInit(): void {
    const courseOfTreatmentId = localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
    if (courseOfTreatmentId){
      this.treatmentService.getTreatmentSummary(courseOfTreatmentId).subscribe(res=>{
        this.treatmentSummarys = res;
      })
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.treatmentSummary).subscribe(res=>{
      this.subfunctions = res;
    })
    this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      this.treatmentService.selectedOvumDetails = this.treatmentSummarys.filter(x=>x.isChecked);
      if (this.treatmentService.selectedOvumDetails.length <= 0){
        this.commonService.showAlertMessage("", "請選擇卵子或胚胎");
        return;
      }
      if (res && res.functionId === 15){
        let ovumDetailIds = this.treatmentService.selectedOvumDetails.map(x=>{
          return x.ovumDetailId
        })
        this.freezeSummaryService.getUnFreezingObservationNoteOvumDetails(ovumDetailIds).subscribe(res=>{
          if (res.length > 0){
            let errorMessage = "卵子編號: \n";
            res.forEach(x=>{
              const index = this.treatmentService.selectedOvumDetails.findIndex(y=>y.ovumDetailId === x);
              errorMessage += this.treatmentService.selectedOvumDetails[index].ovumNumber + ", "
            })
            errorMessage = errorMessage.substring(0, errorMessage.length-2);
            errorMessage += " 尚無冷凍觀察紀錄";
            this.commonService.showAlertMessage("", errorMessage);
            return;
          }
        })
      }
      this.isOpenSubFunction = res;
    })
    this.treatmentService.treatmentSummary.subscribe(res=>{
      this.treatmentSummarys = res;
    })
  }
  currentCourseOfTreatmentId: string | undefined;
  functionSubscription: Subscription | undefined ;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  isSelectAll: boolean = false;
  faTable = faTable;
  isOpenSubFunction: FunctionDto | null = null;
  subfunctions:FunctionDto[]=[];
  onSelectAll(event: any){
    if (event.target.checked){
      this.treatmentSummarys.forEach(x=>{
        x.isChecked = true;
      })
    }
    else{
      this.treatmentSummarys.forEach(x=>{
        x.isChecked = false;
      })
    }
  }

  onSelectOvum(){
    this.isSelectAll = this.treatmentService.isAllTreatmentSummaryChecked(this.treatmentSummarys);
  }


}
