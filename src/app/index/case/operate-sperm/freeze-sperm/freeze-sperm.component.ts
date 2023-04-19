import { CommonService } from './../../../../@Service/common.service';
import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { EmployeeService } from './../../../../@Service/employee.service';
import { DateService } from './../../../../@Service/date.service';
import { MediumDto } from './../../../../@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { SpermFreezeOperationMethodDto } from './../../../../@Models/spermFreezeOperationMethodDto.model';
import { StorageLocation } from './../../../../@Models/storageLocation.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { faSnowflake, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-freeze-sperm',
  templateUrl: './freeze-sperm.component.html',
  styleUrls: ['./freeze-sperm.component.css']
})
export class FreezeSpermComponent implements OnInit, OnDestroy{
  constructor(private operateSpermService:OperateSpermService, private manageStorageService:ManageStorageService, private manageMediumService: ManageMediumService, private dateService:DateService, private employeeService: EmployeeService, private functionHeaderService:FunctionHeaderService, private commonService: CommonService){}
  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
    this.openMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.spermFromCourseOfTreatmentId = this.operateSpermService.baseOperateSpermInfo?.spermFromCourseOfTreatmentId;
    this.freezeSpermForm = new FormGroup({
      "courseOfTreatmentId": new FormControl(this.spermFromCourseOfTreatmentId, Validators.required),
      "mediumInUseArray": new FormArray([new FormControl(null, Validators.required)]),
      "storageUnitId": new FormArray([]),
      "embryologist": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "freezeMedium": new FormControl(null, Validators.required),
      "spermFreezeOperationMethodId": new FormControl(null, Validators.required),
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res;
    });
    this.operateSpermService.getSpermFreezeOperationMethod().subscribe(res=>{
      this.spermFreezeOperateMethods = res;
    });
    this.mediumSubscription = this.manageMediumService.updatedMedium.subscribe(res=>{
      this.freezeMediums = this.manageMediumService.getSpermFreezeMedium(res);
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getInUseMediums();
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.openMediumSubscription = this.manageMediumService.isOpenMediumForm.subscribe(res=>{
      this.isOpenMediumForm = res;
    })
  }
  @ViewChild("container", {read:ViewContainerRef}) container!:ViewContainerRef;
  openMediumSubscription?: Subscription;
  locationSubscription?: Subscription;
  mediumSubscription?:Subscription;
  freezeSpermForm!: FormGroup;
  spermFromCourseOfTreatmentId: string | undefined;
  spermOwner = this.operateSpermService.baseOperateSpermInfo?.spermOwner;
  faSnowflake = faSnowflake;
  faXmark = faXmark;
  selectedLocations?: StorageLocation[];
  spermFreezeOperateMethods?: SpermFreezeOperationMethodDto[];
  freezeMediums: MediumDto[] = [];
  mediums: MediumDto[] = [];
  embryologists?: EmbryologistDto[];
  vialCount = 0;
  isOpenMediumForm = false;
  onOpenMedium(){
    this.manageMediumService.isOpenMediumForm.next(true);
  }
  onDeleteMedium(index: number){
    this.manageMediumService.deleteMediumFromFormArray(<FormArray>(this.freezeSpermForm.get("mediumInUseArray")), index);
  }
  onAddMedium(){
    const mediumFormControl = new FormControl(null, Validators.required);
    (<FormArray>(this.freezeSpermForm.get("mediumInUseArray"))).push(mediumFormControl);
  }
  onAddLocations(){
    this.selectedLocations?.forEach(x=>{
      const locationFormControl = new FormControl(x.unitId, Validators.required);
      (<FormArray>(this.freezeSpermForm.get("storageUnitId"))).push(locationFormControl);
    })
  }
  getMediumInUseArray(){
    return (<FormArray>(this.freezeSpermForm.get("mediumInUseArray"))).controls;
  }
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup){
    if (!this.selectedLocations || this.vialCount !== this.selectedLocations.length){
      Swal.fire("冷凍管數不一致");
      return;
    }
    else{
      this.onAddLocations();
    }
    if ((<FormArray>(this.freezeSpermForm.get("mediumInUseArray"))).controls.length <= 0){
      Swal.fire("請選擇培養液");
      return;
    }
    form.patchValue({
      "spermFreezeOperationMethodId": +form.value.spermFreezeOperationMethodId
    })
    this.operateSpermService.addSpermFreeze(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "冷凍精蟲", res.errorMessage);
      this.onCancel();
    })
  }
}
