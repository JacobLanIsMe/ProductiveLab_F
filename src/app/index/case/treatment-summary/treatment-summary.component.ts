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
  constructor(private treatmentService: TreatmentService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService, private freezeSummaryService: FreezeSummaryService) { }
  ngOnDestroy(): void {
    this.openSubfunctionSubscription?.unsubscribe();
    this.treatmentSubscription?.unsubscribe();
    this.openUpdateFreezeOvumSubscription?.unsubscribe();
    this.treatmentService.selectedOvumDetails.length = 0;
  }
  ngOnInit(): void {
    const courseOfTreatmentId = localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
    if (courseOfTreatmentId) {
      this.treatmentService.getTreatmentSummary(courseOfTreatmentId).subscribe(res => {
        this.treatmentSummarys = res;
      })
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.treatmentSummary).subscribe(res => {
      this.subfunctions = res;
    })
    this.openSubfunctionSubscription = this.functionHeaderService.isOpenSubfunction.subscribe(res => {
      if (res === null) {
        this.isOpenSubFunction = res;
        return;
      }
      this.treatmentService.selectedOvumDetails = this.treatmentSummarys.filter(x => x.isChecked);
      if (this.treatmentService.selectedOvumDetails.length <= 0) {
        this.commonService.showAlertMessage("", "請選擇卵子或胚胎");
        return;
      }
      if (res && res.functionId === 15) {
        let ovumDetailIds = this.treatmentService.selectedOvumDetails.map(x => {
          return x.ovumDetailId
        })
        this.freezeSummaryService.getUnFreezingObservationNoteOvumDetails(ovumDetailIds).subscribe(res => {
          if (res.length > 0) {
            let errorMessage = "卵子編號: ";
            res.forEach(x => {
              const index = this.treatmentService.selectedOvumDetails.findIndex(y => y.ovumDetailId === x);
              errorMessage += this.treatmentService.selectedOvumDetails[index].ovumNumber + ", "
            })
            errorMessage = errorMessage.substring(0, errorMessage.length - 2);
            errorMessage += " 尚無冷凍觀察紀錄";
            this.commonService.showAlertMessage("", errorMessage);
            return;
          }
        })
      }
      this.isOpenSubFunction = res;
    })
    this.treatmentSubscription = this.treatmentService.treatmentSummary.subscribe(res => {
      this.treatmentSummarys = res;
    })
    this.openUpdateFreezeOvumSubscription = this.treatmentService.isOpenUpdateFreezeOvum.subscribe(res => {
      this.isOpenUpdateFreezeOvum = res;
    })
  }
  openSubfunctionSubscription?: Subscription;
  treatmentSubscription?: Subscription;
  openUpdateFreezeOvumSubscription?: Subscription;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  isSelectAll: boolean = false;
  faTable = faTable;
  isOpenSubFunction: FunctionDto | null = null;
  isOpenUpdateFreezeOvum = false;
  subfunctions: FunctionDto[] = [];
  selectedOvums: TreatmentSummaryDto[] = []
  onSelectAll(event: any) {
    this.treatmentSummarys.forEach(x => {
      x.isChecked = event.target.checked
    })
  }
  onSelectOvum(ovum: TreatmentSummaryDto) {
    if (ovum.freezeStorageInfo){
      this.treatmentSummarys.forEach(x => {
        if (x.freezeStorageInfo && x.freezeStorageInfo.unitInfo.storageUnitId === ovum.freezeStorageInfo.unitInfo.storageUnitId) {
          x.isChecked = ovum.isChecked
        }
      })
    }
    this.isSelectAll = this.treatmentService.isAllTreatmentSummaryChecked(this.treatmentSummarys);
  }
  onEdit(ovum: TreatmentSummaryDto) {
    this.selectedOvums.length = 0;
    if (ovum.freezeStorageInfo){
      this.treatmentSummarys.forEach(x=>{
        if (x.freezeStorageInfo && x.freezeStorageInfo.unitInfo.storageUnitId === ovum.freezeStorageInfo.unitInfo.storageUnitId){
          this.selectedOvums.push(x);
        }
      })
    }
    this.treatmentService.isOpenUpdateFreezeOvum.next(true);
  }

}
