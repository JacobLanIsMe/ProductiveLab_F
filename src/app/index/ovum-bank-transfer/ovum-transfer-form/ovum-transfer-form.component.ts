import { GetOvumFreezeSummaryDto } from './../../../@Models/getOvumFreezeSummaryDto.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
@Component({
  selector: 'app-ovum-transfer-form',
  templateUrl: './ovum-transfer-form.component.html',
  styleUrls: ['./ovum-transfer-form.component.css']
})
export class OvumTransferFormComponent implements OnInit {
  constructor(private commonService:CommonService, private freezeSummaryService:FreezeSummaryService, private functionHeaderService:FunctionHeaderService){}
  ngOnInit(): void {
    this.transferForm = new FormGroup({
      "courseOfTreatmentSqlId": new FormControl(null, Validators.required),
      "transferOvums": new FormArray([])
    })
    this.selectedDonorOvums = this.freezeSummaryService.selectedDonorOvumFreezeArray
  }
  selectedDonorOvums: GetOvumFreezeSummaryDto[] = [];
  transferForm!: FormGroup;
  faMoneyBillTransfer =faMoneyBillTransfer;
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form:FormGroup){
    if (this.freezeSummaryService.selectedDonorOvumFreezeArray.length <= 0){
      this.commonService.showAlertMessage("","請選擇欲轉移的卵子");
      return;
    }
    else{
      let formArray = <FormArray>(this.transferForm.get("transferOvums"));
      formArray.clear();
      this.freezeSummaryService.selectedDonorOvumFreezeArray.forEach(x=>{
        const formControl = new FormControl(x.freezeObservationNoteInfo.ovumDetailId);
        formArray.push(formControl);
      })
    }
    console.log(form.value)
  }
}
