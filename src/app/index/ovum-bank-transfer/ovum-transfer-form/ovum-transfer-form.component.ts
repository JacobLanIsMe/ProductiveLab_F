import { GetOvumFreezeSummaryDto } from './../../../@Models/getOvumFreezeSummaryDto.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { TreatmentService } from 'src/app/@Service/treatment.service';
@Component({
  selector: 'app-ovum-transfer-form',
  templateUrl: './ovum-transfer-form.component.html',
  styleUrls: ['./ovum-transfer-form.component.css']
})
export class OvumTransferFormComponent implements OnInit, OnDestroy {
  constructor(private commonService: CommonService, private freezeSummaryService: FreezeSummaryService, private functionHeaderService: FunctionHeaderService, private treatmentService: TreatmentService) { }
  ngOnDestroy(): void {
    if (this.isSubmitSucessfully){
      this.freezeSummaryService.selectedDonorOvumFreezeArray.length = 0;
    }
  }
  ngOnInit(): void {
    const courseOfTreatmentSqlId = this.commonService.getCourseOfTreatmentSqlId();
    this.transferForm = new FormGroup({
      "recipientCourseOfTreatmentSqlId": new FormControl(courseOfTreatmentSqlId, Validators.required),
      "donorCourseOfTreatmentId": new FormControl(null, Validators.required),
      "transferOvumDetailIds": new FormArray([])
    })
    this.selectedDonorOvums = this.freezeSummaryService.selectedDonorOvumFreezeArray
  }
  selectedDonorOvums: GetOvumFreezeSummaryDto[] = [];
  transferForm!: FormGroup;
  faMoneyBillTransfer = faMoneyBillTransfer;
  isSubmitSucessfully = false;
  onCancel() {
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup) {
    if (this.freezeSummaryService.selectedDonorOvumFreezeArray.length <= 0) {
      this.commonService.showAlertMessage("", "請選擇欲轉移的卵子");
      return;
    }
    let formArray = <FormArray>(this.transferForm.get("transferOvumDetailIds"));
    formArray.clear();
    this.freezeSummaryService.selectedDonorOvumFreezeArray.forEach(x => {
      const formControl = new FormControl(x.ovumDetailId);
      formArray.push(formControl);
    });
    const donorCourseOfTreatmentId = this.freezeSummaryService.selectedDonorOvumFreezeArray[0].courseOfTreatmentId;
    this.transferForm.patchValue({
      "donorCourseOfTreatmentId": donorCourseOfTreatmentId
    })
    this.treatmentService.ovumBankTransfer(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "卵子轉移", res.errorMessage, form);
      if (res.isSuccess){
        const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
        if (courseOfTreatmentId){
          this.freezeSummaryService.getRecipientOvumFreezes(courseOfTreatmentId);
        }
        this.freezeSummaryService.getDonorOvums(this.freezeSummaryService.selectedDonorOvumFreezeArray[0].ovumSourceOwner.customerSqlId);
      }
    });

  }
}
