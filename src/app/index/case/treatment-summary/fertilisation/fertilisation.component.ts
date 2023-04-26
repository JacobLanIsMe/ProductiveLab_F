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
@Component({
  selector: 'app-fertilisation',
  templateUrl: './fertilisation.component.html',
  styleUrls: ['./fertilisation.component.css']
})
export class FertilisationComponent implements OnInit, OnDestroy {
  constructor(private dateService:DateService, private treatmentService:TreatmentService, private manageMediumService:ManageMediumService, private functionHeaderService:FunctionHeaderService){}
  ngOnDestroy(): void {
    this.updatedMediumSubscription?.unsubscribe();
    this.selectedMediumSubscription?.unsubscribe();
    this.manageMediumService.selectedMediumArray.length = 0;
  }
  ngOnInit(): void {
    this.fertilisationForm = new FormGroup({
      "fertilisationTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "fertilisationMethodId": new FormControl(null, Validators.required),
      "incubatorId": new FormControl(null, Validators.required),
      "otherIncubator": new FormControl(null),
      "mediumInUseIds": new FormArray([])
    })
    this.treatmentService.getFertilisationMethods().subscribe(res=>{
      this.fertilisationMethods = res;
    })
    this.treatmentService.getIncubators().subscribe(res=>{
      this.incubators = res;
    })
    this.updatedMediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.selectedMediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
      this.manageMediumService.setupMediumFormArray(res, <FormArray>(this.fertilisationForm.get("mediumInUseIds")))
    })
  }
  @Input() subfunction: FunctionDto|null = null;
  updatedMediumSubscription?:Subscription;
  selectedMediumSubscription?:Subscription;
  faHeart = faHeart;
  isOtherIncubator: boolean = false;
  fertilisationForm!: FormGroup;
  fertilisationMethods: CommonDto[] = [];
  incubators: CommonDto[] = [];
  mediums: MediumDto[] = []
  onSelectIncubator(event:any){
    this.isOtherIncubator = +event.target.value === IncubatorEnum.other ? true : false
  }
  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form:FormGroup){
    console.log(form.value);
  }
}
