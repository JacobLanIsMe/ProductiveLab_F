import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-freeze-ovum',
  templateUrl: './freeze-ovum.component.html',
  styleUrls: ['./freeze-ovum.component.css']
})
export class FreezeOvumComponent implements OnInit,OnDestroy {
  @Input() subfunction: FunctionDto|null = null;
  constructor(private dateService:DateService,private employeeService:EmployeeService, private functionHeaderService:FunctionHeaderService, private manageMediumService:ManageMediumService, private manageStorageService:ManageStorageService, private treatmentService:TreatmentService){}
  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.freezeOvumForm = new FormGroup({
      "ovumPickupDetailId": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "storageUnitId": new FormArray([]),
      "mediumInUseId": new FormControl(null, Validators.required),
      "otherMediumName": new FormControl(null),
      "ovumMorphology_A": new FormControl(null),
      "ovumMorphology_B": new FormControl(null),
      "ovumMorphology_C": new FormControl(null),
      "memo": new FormControl(null)
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res;
    });
    
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.manageMediumService.getInUseMedium(MediumTypeEnum.ovumFreezeMedium).subscribe(res=>{
      this.mediums = res;
      this.manageMediumService.getInUseMedium(MediumTypeEnum.other).subscribe(res=>{
        this.otherMedium = res;
        this.integrateMedium(this.mediums, this.otherMedium);
      })
    })
  }
  locationSubscription?: Subscription;
  freezeOvumForm!: FormGroup;
  faSnowflake = faSnowflake;
  embryologists?: EmbryologistDto[];
  mediums?:MediumDto;
  otherMedium?: MediumDto;
  selectedLocations?: StorageLocation[];
  integrateMedium(mediums?: MediumDto, otherMedium?: MediumDto){
    if (mediums && mediums.data && otherMedium && otherMedium.data){
      otherMedium.data.forEach(x=>{
        mediums.data.push(x);
      })
    }
  }
  addUnitIdToForm(){
    if (this.selectedLocations && this.selectedLocations.length > 0){
      this.selectedLocations.forEach(x=>{
        const formControl = new FormControl(x.unitId, Validators.required);
        (<FormArray>(this.freezeOvumForm.get("storageUnitId"))).push(formControl);
      })
    }
  }
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup){
    this.addUnitIdToForm();
    console.log(form.value);
    
  }
}
