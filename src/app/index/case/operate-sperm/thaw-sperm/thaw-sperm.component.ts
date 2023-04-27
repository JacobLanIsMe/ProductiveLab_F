import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpermFreezeDto } from 'src/app/@Models/spermFreezeDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { OperateSpermService } from 'src/app/@Service/operate-sperm.service';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/@Service/date.service';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { SpermThawMethodEnum } from 'src/app/@Enums/spermThawMethodEnum.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-thaw-sperm',
  templateUrl: './thaw-sperm.component.html',
  styleUrls: ['./thaw-sperm.component.css']
})
export class ThawSpermComponent implements OnInit, OnDestroy {
  constructor(private operateSpermService: OperateSpermService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService, private dateService: DateService, private employeeService: EmployeeService, private manageMediumService:ManageMediumService) { }
  ngOnDestroy(): void {
    this.updatedMediumSubscription?.unsubscribe();
    this.selectedMediumSubscription?.unsubscribe();
    this.manageMediumService.selectedMediumArray.length = 0;
  }
  ngOnInit(): void {
    this.thawSpermForm = new FormGroup({
      "courseOfTreatmentId": new FormControl(this.commonService.getCourseOfTreatmentId(), Validators.required),
      "thawTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "spermThawMethodId": new FormControl(null, Validators.required),
      "spermFreezeIds": new FormArray([]),
      "recheckEmbryologist": new FormControl(null, Validators.required),
      "otherSpermThawMethod": new FormControl(null),
      "mediumInUseIds": new FormArray([])
    })
    const spermFromCourseOfTreatmentId = this.commonService.getSpermFromCourseOfTreatmentId();
    if (spermFromCourseOfTreatmentId) {
      this.operateSpermService.getSpermFreeze(spermFromCourseOfTreatmentId).subscribe(res => {
        this.spermFreezes = res;
      })
    }
    this.employeeService.getAllEmbryologist().subscribe(res => {
      this.embryologists = res;
    })
    this.operateSpermService.getSpermThawMethods().subscribe(res => {
      this.spermThawMethods = res;
    })
    this.updatedMediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.mediums = this.manageMediumService.getRegularMedium(res)
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.selectedMediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
      this.manageMediumService.setupMediumFormArray(res, <FormArray>(this.thawSpermForm.get("mediumInUseIds")))
    })
  }
  updatedMediumSubscription?:Subscription;
  selectedMediumSubscription?:Subscription;
  thawSpermForm!: FormGroup;
  embryologists: EmbryologistDto[] = [];
  spermThawMethods: CommonDto[] = [];
  spermFreezes: SpermFreezeDto[] = [];
  mediums: MediumDto[] = [];
  isSelectAll: boolean = false;
  isOtherSpermThawMethod: boolean = false;
  faListCheck = faListCheck;
  spermOwnerSqlId?: number = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerSqlId;
  spermOwnerName?: string = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerName;
  selectSpermThawMethod(event: any) {
    this.isOtherSpermThawMethod = +event.target.value === SpermThawMethodEnum.other ? true : false
  }
  onSelectAll(event: any) {
    this.spermFreezes.forEach(x => {
      x.isChecked = event.target.checked;
    })
  }
  onSelectLocation() {
    let arr = this.spermFreezes.filter(x => !x.isChecked);
    this.isSelectAll = arr.length ? false : true;
  }
  onCancel() {
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup) {
    const spermFreezeIdFormArray = <FormArray>(this.thawSpermForm.get("spermFreezeIds"));
    spermFreezeIdFormArray.clear();
    this.spermFreezes.forEach(x => {
      if (x.isChecked) {
        spermFreezeIdFormArray.push(new FormControl(x.spermFreezeId))
      }
    })
    if (spermFreezeIdFormArray.controls.length <= 0){
      this.commonService.showAlertMessage("", "請選擇要解凍的精蟲");
      return;
    }
    this.operateSpermService.addSpermThaw(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "解凍精子", res.errorMessage, form);
    })
  }
}
