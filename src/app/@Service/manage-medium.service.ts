import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { MediumTypeEnum } from '../@Enums/mediumTypeEnum.model';
import { MediumDto } from '../@Models/mediumDto.model';
import { CommonDto } from '../@Models/commonDto.model';
import { FrequentlyUsedMediumDto } from '../@Models/frequentlyUsedMediumDto.model';
import { ShowMediumInfoComponent } from '../@shared/manage-medium/show-medium-info/show-medium-info.component';

@Injectable({
  providedIn: 'root'
})
export class ManageMediumService implements OnDestroy {
  constructor(private http: HttpClient, private overlay:Overlay) { }
  ngOnDestroy(): void {
    this.showMediumInfoSubscription?.unsubscribe();
  }
  selectedMediums = new Subject<MediumDto[]>();
  selectedMediumArray: MediumDto[] = [];
  isOpenMediumForm = new Subject<boolean>();
  updatedMedium = new Subject<MediumDto[]>();
  updatedFrequentlyUsedMedium = new Subject<FrequentlyUsedMediumDto[]>()
  AddMediumInUse(mediumForm: FormGroup){
    return this.http.post<BaseResponseDto>("/api/MediumManager/AddMediumInUse", mediumForm.value);
  }
  getMediumTypes(){
    return this.http.get<CommonDto[]>("/api/MediumManager/GetMediumTypes")
  }
  getFrequentlyUsedMediums(){
    this.http.get<FrequentlyUsedMediumDto[]>("/api/MediumManager/GetFrequentlyUsedMediums").subscribe(res=>{
      this.updatedFrequentlyUsedMedium.next(res);
    })
  }
  getInUseMediums(){
    this.http.get<MediumDto[]>("/api/MediumManager/GetInUseMediums").subscribe(res=>{
      this.updatedMedium.next(res);
    })
  }
  getRegularMedium(mediums: MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.regularMedium || x.mediumTypeId === null);
  }
  getSpermFreezeMedium(mediums: MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.spermFreezeMedium || x.mediumTypeId === null);
  }
  getOvumFreezeMedium(mediums: MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium || x.mediumTypeId === null);
  }
  getOtherMedium(mediums:MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium);
  }
  getOvumFreezeAndOtherMediun(mediums:MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium || x.mediumTypeId === MediumTypeEnum.other);
  }
  getSpermFreezeAndOtherMedium(mediums:MediumDto[]){
    return mediums.filter(x=>x.mediumTypeId === MediumTypeEnum.spermFreezeMedium || x.mediumTypeId === MediumTypeEnum.other)
  }
  deleteMediumFromFormArray(formArray: FormArray, index: number){
    if (formArray.controls.length<=1){
      return;
    }
    else{
      formArray.removeAt(index);
    }
  }
  setupMediumFormArray(mediums:MediumDto[], formArray:FormArray){
    formArray.clear();
    if (mediums.length <= 0){
      formArray.push(new FormControl(null))
    }
    else{
      mediums.forEach(x=>{
        formArray.push(new FormControl(x.mediumInUseId));
      })
    }
  }
  addMediumFormControl(formArray:FormArray){
    if (formArray.controls.length < 3 && formArray.controls.length <= this.selectedMediumArray.length){
      formArray.push(new FormControl(null));
    }
  }
  deleteMediumFormControl(index:number){
    this.selectedMediumArray.splice(index, 1);
    this.selectedMediums.next(this.selectedMediumArray);
  }
  overlayRef?:OverlayRef;
  showMediumInfoSubscription?:Subscription;
  openShowMediumInfo(mediums:MediumDto[], event:MouseEvent, index:number){
    this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      backdropClass:'cdk-overlay-transparent-backdrop',
      positionStrategy:this.overlay.position().flexibleConnectedTo({x:event.clientX, y:event.clientY}).withPositions([
        {originX:'start', originY:'top',overlayX:'center',overlayY:'bottom'}
      ])
    })
    const componentRef = this.overlayRef.attach(new ComponentPortal(ShowMediumInfoComponent));
    componentRef.instance.mediums = mediums;
    this.overlayRef.backdropClick().subscribe(()=>{
      this.overlayRef?.detach();
    });
    
    this.showMediumInfoSubscription = componentRef.instance.close?.subscribe(res=>{
      this.selectedMediumArray[index] = res;
      this.selectedMediums.next(this.selectedMediumArray);
      this.overlayRef?.detach();
      this.showMediumInfoSubscription?.unsubscribe();
      
    })
  }
}
