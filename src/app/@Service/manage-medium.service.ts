import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MediumTypeEnum } from '../@Enums/mediumTypeEnum.model';
import { MediumDto } from '../@Models/mediumDto.model';
import { CommonDto } from '../@Models/commonDto.model';
import { FrequentlyUsedMediumDto } from '../@Models/frequentlyUsedMediumDto.model';
import { ShowMediumInfoComponent } from '../@shared/manage-medium/show-medium-info/show-medium-info.component';

@Injectable({
  providedIn: 'root'
})
export class ManageMediumService {
  constructor(private http: HttpClient, private overlay:Overlay) { }
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
  deleteMediumFromFormArray(formArray: FormArray, index: number){
    if (formArray.controls.length<=1){
      return;
    }
    else{
      formArray.removeAt(index);
    }
  }
  overlayRef?:OverlayRef;
  openShowMediumInfo(medium:MediumDto){
    this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy:this.overlay.position().global().centerHorizontally().centerVertically()
    })
    const componentRef = this.overlayRef.attach(new ComponentPortal(ShowMediumInfoComponent));
    componentRef.instance.medium = medium;
  }
}
