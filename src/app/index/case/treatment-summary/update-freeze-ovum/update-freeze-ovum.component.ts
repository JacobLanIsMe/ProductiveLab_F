import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { TreatmentService } from 'src/app/@Service/treatment.service';
@Component({
  selector: 'app-update-freeze-ovum',
  templateUrl: './update-freeze-ovum.component.html',
  styleUrls: ['./update-freeze-ovum.component.css']
})
export class UpdateFreezeOvumComponent implements OnInit, OnDestroy {
  constructor(private dateService:DateService,private manageMediumService: ManageMediumService, private treatmentService:TreatmentService){}
  ngOnDestroy(): void {
    this.freezeMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.updateFreezeOvumForm = new FormGroup({
      "operationTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "ovumMorphology_A": new FormControl(null),
      "ovumMorphology_B": new FormControl(null),
      "ovumMorphology_C": new FormControl(null),
      "freezeMedium": new FormControl(null, Validators.required),
      "otherFreezeMediumName": new FormControl(null),
      "memo": new FormControl(null),
    })
    this.freezeMediumSubscription = this.manageMediumService.selectedMedium.subscribe(res=>{
      this.updateFreezeOvumForm.patchValue({
        "freezeMedium": res.mediumInUseId
      })
      this.isSelectOtherMedium = res.mediumTypeId === MediumTypeEnum.other ? true : false;
    })
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.freezeMediums = this.manageMediumService.getOvumFreezeAndOtherMediun(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
  }
  freezeMediumSubscription?:Subscription;
  mediumSubscription?:Subscription;
  updateFreezeOvumForm!: FormGroup;
  freezeMediums:MediumDto[] = []
  isSelectOtherMedium = false;
  faSnowflake = faSnowflake;
  onCancel(){
    this.treatmentService.isOpenUpdateFreezeOvum.next(false);
  }
  onSubmit(form: FormGroup){
    console.log(form.value)
  }
}
