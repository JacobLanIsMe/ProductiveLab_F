import { SelectSpermFreezeComponent } from './../../../index/case/operate-sperm/select-sperm-freeze/select-sperm-freeze.component';
import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/@Service/date.service';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/@Service/common.service';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { FrequentlyUsedMediumDto } from 'src/app/@Models/frequentlyUsedMediumDto.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-open-medium',
  templateUrl: './open-medium.component.html',
  styleUrls: ['./open-medium.component.css']
})
export class OpenMediumComponent implements OnInit, OnDestroy {
  @ViewChild("container", {read:ViewContainerRef}) container!:ViewContainerRef;
  constructor(private manageMediumService: ManageMediumService, private dateService: DateService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.frequentlyUsedMediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.mediumForm = new FormGroup({
      "frequentlyUsedMediumId": new FormControl(null),
      "customizedMedium": new FormControl(null),
      "openDate": new FormControl(this.dateService.getTodayDateString(new Date()), Validators.required),
      "expirationDate": new FormControl(null, Validators.required),
      "lotNumber": new FormControl(null, Validators.required),
      "mediumTypeId": new FormControl(null)
    })
    this.manageMediumService.getMediumTypes().subscribe(res=>{
      this.mediumTypes = res;
    })
    this.frequentlyUsedMediumSubscription = this.manageMediumService.updatedFrequentlyUsedMedium.subscribe(res=>{
      this.frequentlyUsedMediums = res;
    })
    this.manageMediumService.getFrequentlyUsedMediums();
  }
  frequentlyUsedMediumSubscription?: Subscription;
  mediumForm!: FormGroup;
  frequentlyUsedMediums: FrequentlyUsedMediumDto[] = [];
  mediumTypes: CommonDto[] = [];
  faSquarePlus: IconDefinition = faSquarePlus;
  onEnterCustomizedMedium(event:any){
    if (event.target.value){
      this.mediumForm.get("frequentlyUsedMediumId")?.reset();
      this.mediumForm.get("mediumTypeId")?.reset();
      this.mediumForm.get("mediumTypeId")?.enable();
    }
  }
  onSelectMedium(event:any){
    const selectedMedium = this.frequentlyUsedMediums.filter(x=>x.id === +event.target.value);
    if (selectedMedium.length>0){
      this.mediumForm.patchValue({
        "mediumTypeId":selectedMedium[0].mediumTypeId
      })
      this.mediumForm.get("mediumTypeId")?.disable();
      this.mediumForm.get("customizedMedium")?.reset();
    }
    else{
      this.mediumForm.get("mediumTypeId")?.reset();
      this.mediumForm.get("mediumTypeId")?.enable();
    }
  }
  getNameControl(){
    return this.mediumForm.controls["name"];
  }
  getOpenDateControl(){
    return this.mediumForm.controls["openDate"];
  }
  getExpirationDateControl(){
    return this.mediumForm.controls["expirationDate"];
  }
  getLotNumberControl(){
    return this.mediumForm.controls["lotNumber"];
  }
  onCancel(){
    this.manageMediumService.isOpenMediumForm.next(false);
  }
  onSubmit(mediumForm: FormGroup){
    mediumForm.get("mediumTypeId")?.enable();
    mediumForm.patchValue({
      "frequentlyUsedMediumId": +mediumForm.value.frequentlyUsedMediumId,
      "mediumTypeId": +mediumForm.value.mediumTypeId
    })
    this.manageMediumService.AddMediumInUse(mediumForm).subscribe(res=>{
      this.manageMediumService.getInUseMediums();
      this.commonService.judgeTheResponse(res, this.container, "開封培養液", res.errorMessage, mediumForm)
    });
  }
}
