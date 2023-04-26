import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { Subscription } from 'rxjs';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { StorageLocation } from 'src/app/@Models/storageLocation.model';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { CommonService } from 'src/app/@Service/common.service';
import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { GetObservationNoteNameDto } from 'src/app/@Models/getObservationNoteNameDto.model';
import { CommonDto } from 'src/app/@Models/commonDto.model';
@Component({
  selector: 'app-freeze-ovum',
  templateUrl: './freeze-ovum.component.html',
  styleUrls: ['./freeze-ovum.component.css']
})
export class FreezeOvumComponent implements OnInit,OnDestroy {
  @Input() subfunction: FunctionDto|null = null;
  constructor(private dateService:DateService,private employeeService:EmployeeService, private functionHeaderService:FunctionHeaderService, private manageMediumService:ManageMediumService, private manageStorageService:ManageStorageService, private treatmentService:TreatmentService, private commonService:CommonService, private observationNoteService:ObservationNoteService){}
  ngOnDestroy(): void {
    this.mediumSubscription?.unsubscribe();
    this.openMediumFormSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.freezeOvumForm = new FormGroup({
      "ovumPickupDetailId": new FormArray([]),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "storageUnitId": new FormControl(null),
      "mediumInUseId": new FormControl(null, Validators.required),
      "otherMediumName": new FormControl(null),
      "ovumMorphology_A": new FormControl(0,Validators.required),
      "ovumMorphology_B": new FormControl(0, Validators.required),
      "ovumMorphology_C": new FormControl(0, Validators.required),
      "memo": new FormControl(null),
      "topColorId": new FormControl(null, Validators.required)
    })
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.mediums=this.manageMediumService.getOvumFreezeAndOtherMediun(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.observationNoteService.getFreezeObservationNotes(this.treatmentService.selectedOvumPickupDetailIds).subscribe(res=>{
      this.selectedObservationNotes = res;
    });
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.treatmentService.getTopColors().subscribe(res=>{
      this.topColors = res;
    })
    this.openMediumFormSubscription = this.manageMediumService.isOpenMediumForm.subscribe(res=>{
      this.isOpenMediumForm = res;
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res;
    })
  }
  locationSubscription?: Subscription;
  todayDate = this.dateService.getTodayDateString(new Date());
  freezeOvumForm!: FormGroup;
  topColors?: CommonDto[];
  faSnowflake = faSnowflake;
  embryologists: EmbryologistDto[] = [];
  mediumSubscription?:Subscription;
  mediums:MediumDto[] = [];
  openMediumFormSubscription?: Subscription;
  isOpenMediumForm = false;
  isChooseOtherMedium = false;
  selectedLocations: StorageLocation[] = [];
  selectedObservationNotes?: GetObservationNoteNameDto[];
  onSelectMedium(event:any){
    const selectedMedium = this.mediums.filter(x=>x.mediumInUseId === event.target.value);
    if (selectedMedium.length>0){
      this.isChooseOtherMedium = selectedMedium[0].mediumTypeId === MediumTypeEnum.other ? true : false; 
    }
  }
  onOpenMediumForm(){
    this.manageMediumService.isOpenMediumForm.next(true);
  }
  addStorageUnitIdToForm(){
    if (this.selectedLocations.length === 1){
      this.freezeOvumForm.patchValue({
        "storageUnitId": this.selectedLocations[0].unitId
      })
      return true;
    }
    else{
      this.commonService.showAlertMessage("", "儲位數量有誤");
      return false;
    }
  }
  addOvumPickupDetailId(){
    if (this.treatmentService.selectedOvumPickupDetailIds.length > 0 && this.treatmentService.selectedOvumPickupDetailIds.length <= 4){
      const formArray = <FormArray>(this.freezeOvumForm.get("ovumPickupDetailId"));
      formArray.clear();
      this.treatmentService.selectedOvumPickupDetailIds.forEach(x=>{
        const formControl = new FormControl(x, Validators.required);
        formArray.push(formControl);
      }) 
      return true;
    }
    else{
      this.commonService.showAlertMessage("", "卵子數量請介於 1-4");
      return false;
    }
  }
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup){
    if (!this.addOvumPickupDetailId()){
      return;
    }
    if (!this.addStorageUnitIdToForm()){
      return;
    }
    this.freezeOvumForm.patchValue({
      "topColorId": +this.freezeOvumForm.value.topColorId
    })
    this.treatmentService.addOvumFreeze(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "冷凍入庫", res.errorMessage, form);
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.treatmentService.updateTreatmentSummary(courseOfTreatmentId);
      }
    })
  }
}
