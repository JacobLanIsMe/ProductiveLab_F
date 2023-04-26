import { CommonService } from './../../../../@Service/common.service';
import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { EmployeeService } from './../../../../@Service/employee.service';
import { DateService } from './../../../../@Service/date.service';
import { MediumDto } from './../../../../@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSnowflake, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { Subscription } from 'rxjs';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { StorageLocation } from 'src/app/@Models/storageLocation.model';
@Component({
  selector: 'app-freeze-sperm',
  templateUrl: './freeze-sperm.component.html',
  styleUrls: ['./freeze-sperm.component.css']
})
export class FreezeSpermComponent implements OnInit, OnDestroy{
  constructor(private operateSpermService:OperateSpermService, private manageStorageService:ManageStorageService, private manageMediumService: ManageMediumService, private dateService:DateService, private employeeService: EmployeeService, private functionHeaderService:FunctionHeaderService, private commonService: CommonService){}
  ngOnDestroy(): void {
    this.mediumSubscription?.unsubscribe();
    this.selectedMediumSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
    this.manageMediumService.selectedMediumArray = []
  }
  ngOnInit(): void {
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    this.freezeSpermForm = new FormGroup({
      "courseOfTreatmentId": new FormControl(courseOfTreatmentId, Validators.required),
      "mediumInUseArray": new FormArray([new FormControl(null)]),
      "storageUnitId": new FormArray([]),
      "embryologist": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "freezeMedium": new FormControl(null, Validators.required),
      "spermFreezeOperationMethodId": new FormControl(null, Validators.required),
      "otherFreezeMediumName":new FormControl(null)
    })
    this.operateSpermService.getSpermFreezeOperationMethod().subscribe(res=>{
      this.spermFreezeOperateMethods = res;
    });
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.freezeMediums = this.manageMediumService.getSpermFreezeAndOtherMedium(res);
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.selectedMediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
      this.manageMediumService.setupMediumFormArray(res, <FormArray>(this.freezeSpermForm.get("mediumInUseArray")))
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res;
    })
    this.manageMediumService.selectedMedium.subscribe(res=>{
      this.freezeSpermForm.patchValue({
        "freezeMedium": res.mediumInUseId
      })
      this.isSelectOtherMedium = res.mediumTypeId === MediumTypeEnum.other ? true : false;
    })
  }
  mediumSubscription?:Subscription;
  selectedMediumSubscription?:Subscription;
  locationSubscription?:Subscription;
  freezeSpermForm!: FormGroup;
  spermFromCourseOfTreatmentId: string | undefined;
  spermOwner = this.operateSpermService.baseOperateSpermInfo?.spermOwner;
  faSnowflake = faSnowflake;
  faXmark = faXmark;
  spermFreezeOperateMethods: CommonDto[] = [];
  freezeMediums: MediumDto[] = [];
  mediums: MediumDto[] = [];
  embryologists: EmbryologistDto[] = [];
  isSelectOtherMedium = false;
  vialCount = 0;
  isOpenMediumForm = false;
  selectedLocations: StorageLocation[] = [];
  
  onAddLocations(){
    (<FormArray>(this.freezeSpermForm.get("storageUnitId"))).clear();
    this.selectedLocations.forEach(x=>{
      const locationFormControl = new FormControl(x.unitId, Validators.required);
      (<FormArray>(this.freezeSpermForm.get("storageUnitId"))).push(locationFormControl);
    })
  }
  
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup){
    if (this.vialCount !== this.selectedLocations.length){
      this.commonService.showAlertMessage("", "冷凍管數不一致");
      return;
    }
    else{
      this.onAddLocations();
    }
    if ((<FormArray>(this.freezeSpermForm.get("mediumInUseArray"))).controls.length <= 0 || this.manageMediumService.selectedMediumArray.length <= 0){
      this.commonService.showAlertMessage("", "請選擇培養液");
      return;
    }
    form.patchValue({
      "spermFreezeOperationMethodId": +form.value.spermFreezeOperationMethodId
    })
    // console.log(this.selectedLocations)
    this.operateSpermService.addSpermFreeze(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "冷凍精蟲", res.errorMessage, form);
    })
  }
}
