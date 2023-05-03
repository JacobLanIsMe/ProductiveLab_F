import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { DateService } from 'src/app/@Service/date.service';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { TreatmentService } from 'src/app/@Service/treatment.service';
@Component({
  selector: 'app-thaw-ovum-embryo-form',
  templateUrl: './thaw-ovum-embryo-form.component.html',
  styleUrls: ['./thaw-ovum-embryo-form.component.css']
})
export class ThawOvumEmbryoFormComponent implements OnInit, OnDestroy {
  constructor(private dateService:DateService, private employeeService:EmployeeService, private manageMediumService:ManageMediumService, private functionHeaderService:FunctionHeaderService, private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private treatmentService:TreatmentService){}
  ngOnDestroy(): void {
    this.thawMediumSubscription?.unsubscribe();
    this.updatedInUseMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
    this.manageMediumService.selectedMediumArray.length = 0;
  }
  ngOnInit(): void {
    this.thawOvumForm = new FormGroup({
      "thawTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "thawMediumInUseId": new FormControl(null, Validators.required),
      "recheckEmbryologist": new FormControl(null, Validators.required),
      "mediumInUseIds": new FormArray([]),
      "freezeOvumDetailIds":new FormArray([]),
      "courseOfTreatmentId":new FormControl(this.commonService.getCourseOfTreatmentId(), Validators.required)
    })
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.updatedInUseMediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.thawMediums = this.manageMediumService.getRegularMedium(res);
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.thawMediumSubscription = this.manageMediumService.selectedMedium.subscribe(res=>{
      this.manageMediumService.setupMediumFormControl(res, <FormControl>(this.thawOvumForm.get("thawMediumInUseId")))
    })
    this.mediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
      this.manageMediumService.setupMediumFormArray(res, <FormArray>(this.thawOvumForm.get("mediumInUseIds")))
    })
  }
  @Input() functionName?:string;
  thawMediumSubscription?:Subscription;
  updatedInUseMediumSubscription?:Subscription;
  mediumSubscription?:Subscription;
  thawOvumForm!: FormGroup;
  selectedRecipientOvumFreezes: GetOvumFreezeSummaryDto[] = this.freezeSummaryService.selectedRecipientOvumFreezeArray;
  faListCheck = faListCheck;
  embryologists: EmbryologistDto[] = [];
  thawMediums: MediumDto[] = [];
  mediums:MediumDto[] = [];
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form:FormGroup){
    this.freezeSummaryService.selectedRecipientOvumFreezeArray.forEach(x=>{
      (<FormArray>(this.thawOvumForm.get("freezeOvumDetailIds"))).push(new FormControl(x.freezeObservationNoteInfo.ovumDetailId))
    })
    this.treatmentService.addOvumThaw(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "解凍卵子", res.errorMessage, form)
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.freezeSummaryService.getRecipientOvumFreezes(courseOfTreatmentId);
      }
    })
  }
}
