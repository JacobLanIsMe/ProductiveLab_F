import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/@Service/date.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { IncubatorEnum } from 'src/app/@Enums/incubatorEnum.model';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { Subscription } from 'rxjs';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { OperateSpermService } from 'src/app/@Service/operate-sperm.service';
import { CommonService } from 'src/app/@Service/common.service';
import { SpermScoreDto } from 'src/app/@Models/spermScoreDto.model';
import { Common2Dto } from 'src/app/@Models/common2Dto.model';
@Component({
  selector: 'app-fertilisation',
  templateUrl: './fertilisation.component.html',
  styleUrls: ['./fertilisation.component.css']
})
export class FertilisationComponent implements OnInit, OnDestroy {
  constructor(private dateService:DateService, private treatmentService:TreatmentService, private manageMediumService:ManageMediumService, private functionHeaderService:FunctionHeaderService, private employeeService:EmployeeService, private operateSpermService:OperateSpermService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.updatedMediumSubscription?.unsubscribe();
    this.selectedMediumSubscription?.unsubscribe();
    this.spermScoreSubscription?.unsubscribe();
    this.manageMediumService.selectedMediumArray.length = 0;
    this.treatmentService.selectedOvumDetails.length = 0;
    // this.operateSpermService.allSpermScoreArray.length = 0;
  }
  ngOnInit(): void {
    this.fertilizationForm = new FormGroup({
      "fertilizationTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "fertilizationMethodId": new FormControl(null, Validators.required),
      "incubatorId": new FormControl(null, Validators.required),
      "otherIncubator": new FormControl(null),
      "mediumInUseIds": new FormArray([]),
      "embryologist": new FormControl(null, Validators.required),
      "ovumDetailIds": new FormArray([])
    })
    this.treatmentService.getFertilizationMethods().subscribe(res=>{
      this.fertilizationMethods = res;
    })
    this.treatmentService.getIncubators().subscribe(res=>{
      this.incubators = res;
    })
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.updatedMediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.selectedMediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
      this.manageMediumService.setupMediumFormArray(res, <FormArray>(this.fertilizationForm.get("mediumInUseIds")))
    })
    this.spermScoreSubscription = this.operateSpermService.allSpermScore.subscribe(res=>{
      this.spermScores = res;
    })
    this.courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (this.courseOfTreatmentId){
      this.operateSpermService.getSpermScores(this.courseOfTreatmentId);
    }
    
  }
  @Input() subfunction: FunctionDto|null = null;
  updatedMediumSubscription?:Subscription;
  selectedMediumSubscription?:Subscription;
  spermScoreSubscription?:Subscription;
  courseOfTreatmentId:string|null = null;
  faHeart = faHeart;
  isOtherIncubator: boolean = false;
  fertilizationForm!: FormGroup;
  fertilizationMethods: CommonDto[] = [];
  incubators: CommonDto[] = [];
  mediums: MediumDto[] = [];
  embryologists: Common2Dto[] = [];
  selectedOvumDetails:TreatmentSummaryDto[] = this.treatmentService.selectedOvumDetails;
  spermScores: SpermScoreDto[] = [];
  onSelectIncubator(event:any){
    this.isOtherIncubator = +event.target.value === IncubatorEnum.other ? true : false
  }
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form:FormGroup){
    if (this.spermScores.length <= 0){
      this.commonService.showAlertMessage("", "精子尚未評分");
      return;
    }
    if (this.treatmentService.selectedOvumDetails.length <= 0){
      this.commonService.showAlertMessage("", "請選擇要受精的卵子");
      return;
    }
    else{
      const ovumPickupDetailIdFormArray = <FormArray>(this.fertilizationForm.get("ovumDetailIds"));
      ovumPickupDetailIdFormArray.clear();
      this.treatmentService.selectedOvumDetails.forEach(x=>{
        ovumPickupDetailIdFormArray.push(new FormControl(x.ovumDetailId));
      })
    }
    this.treatmentService.addFertilization(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "受精", res.errorMessage, form);
      if (this.courseOfTreatmentId){
        this.treatmentService.updateTreatmentSummary(this.courseOfTreatmentId);
      }
    })
  }
}
