import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { Common2Dto } from 'src/app/@Models/common2Dto.model';
@Component({
  selector: 'app-update-freeze-ovum',
  templateUrl: './update-freeze-ovum.component.html',
  styleUrls: ['./update-freeze-ovum.component.css']
})
export class UpdateFreezeOvumComponent implements OnInit, OnDestroy {
  constructor(private dateService:DateService,private manageMediumService: ManageMediumService, private treatmentService:TreatmentService, private employeeService:EmployeeService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.freezeMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.updateFreezeOvumForm = new FormGroup({
      "ovumDetailId": new FormArray([]),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "ovumMorphology_A": new FormControl(0, [Validators.required, Validators.min(0)]),
      "ovumMorphology_B": new FormControl(0, [Validators.required, Validators.min(0)]),
      "ovumMorphology_C": new FormControl(0, [Validators.required, Validators.min(0)]),
      "mediumInUseId": new FormControl(null, Validators.required),
      "otherMediumName": new FormControl(null),
      "memo": new FormControl(null),
    })
    if (this.selectedOvums.length){
      this.treatmentService.getOvumFreeze(this.selectedOvums[0].ovumDetailId).subscribe(res=>{
        this.updateFreezeOvumForm.patchValue({
          "freezeTime": res.freezeTime,
          "embryologist": res.embryologist,
          "ovumMorphology_A": res.ovumMorphology_A,
          "ovumMorphology_B": res.ovumMorphology_B,
          "ovumMorphology_C": res.ovumMorphology_C,
          "memo": res.memo
        })
      })
    }
    this.freezeMediumSubscription = this.manageMediumService.selectedMedium.subscribe(res=>{
      this.updateFreezeOvumForm.patchValue({
        "mediumInUseId": res.mediumInUseId
      })
      this.isSelectOtherMedium = res.mediumTypeId === MediumTypeEnum.other ? true : false;
    })
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.freezeMediums = this.manageMediumService.getOvumFreezeAndOtherMediun(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
  }
  @Input() selectedOvums: TreatmentSummaryDto[] = []
  freezeMediumSubscription?:Subscription;
  mediumSubscription?:Subscription;
  updateFreezeOvumForm!: FormGroup;
  freezeMediums:MediumDto[] = []
  isSelectOtherMedium = false;
  faSnowflake = faSnowflake;
  embryologists: Common2Dto[] = [];
  onCancel(){
    this.treatmentService.isOpenUpdateFreezeOvum.next(false);
  }
  onSubmit(form: FormGroup){
    let formArray = <FormArray>this.updateFreezeOvumForm.get("ovumDetailId");
    formArray.clear();
    this.selectedOvums.forEach(x=>{
      const formControl = new FormControl(x.ovumDetailId);
      formArray.push(formControl);
    })
    if (!formArray.controls.length){
      this.commonService.showAlertMessage("","請選擇要修改的卵子");
      return
    }
    this.treatmentService.updateOvumFreeze(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "更新冷凍入庫紀錄", res.errorMessage, form);
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.treatmentService.updateTreatmentSummary(courseOfTreatmentId);
      }
    });
  }
}
