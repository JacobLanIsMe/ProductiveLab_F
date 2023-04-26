import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  constructor(private http: HttpClient, private overlay: Overlay) { }
  ngOnDestroy(): void {
    this.showMediumInfoSubscription?.unsubscribe();
  }
  selectedMediums = new Subject<MediumDto[]>();
  selectedMediumArray: MediumDto[] = [];
  selectedMedium = new Subject<MediumDto>();
  isOpenMediumForm = new Subject<boolean>();
  updatedMedium = new Subject<MediumDto[]>();
  updatedFrequentlyUsedMedium = new Subject<FrequentlyUsedMediumDto[]>()
  AddMediumInUse(mediumForm: FormGroup) {
    return this.http.post<BaseResponseDto>("/api/MediumManager/AddMediumInUse", mediumForm.value);
  }
  getMediumTypes() {
    return this.http.get<CommonDto[]>("/api/MediumManager/GetMediumTypes")
  }
  getFrequentlyUsedMediums() {
    this.http.get<FrequentlyUsedMediumDto[]>("/api/MediumManager/GetFrequentlyUsedMediums").subscribe(res => {
      this.updatedFrequentlyUsedMedium.next(res);
    })
  }
  getInUseMediums() {
    this.http.get<MediumDto[]>("/api/MediumManager/GetInUseMediums").subscribe(res => {
      this.updatedMedium.next(res);
    })
  }
  getRegularMedium(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.regularMedium || x.mediumTypeId === null);
  }
  getSpermFreezeMedium(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.spermFreezeMedium || x.mediumTypeId === null);
  }
  getOvumFreezeMedium(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium || x.mediumTypeId === null);
  }
  getOtherMedium(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium);
  }
  getOvumFreezeAndOtherMediun(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.ovumFreezeMedium || x.mediumTypeId === MediumTypeEnum.other);
  }
  getSpermFreezeAndOtherMedium(mediums: MediumDto[]) {
    return mediums.filter(x => x.mediumTypeId === MediumTypeEnum.spermFreezeMedium || x.mediumTypeId === MediumTypeEnum.other)
  }
  setupMediumFormArray(mediums: MediumDto[], formArray: FormArray) {
    formArray.clear();
    mediums.forEach(x => {
      formArray.push(new FormControl(x.mediumInUseId));
    })
  }
  overlayRef?: OverlayRef;
  showMediumInfoSubscription?: Subscription;
  openShowMediumInfo(origin: ElementRef, mediums: MediumDto[], index: number, isMultiple: boolean) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position().flexibleConnectedTo(origin.nativeElement).withPositions([
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }
      ])
    })
    const componentRef = this.overlayRef.attach(new ComponentPortal(ShowMediumInfoComponent));
    componentRef.instance.mediums = mediums;
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.detach();
    });

    this.showMediumInfoSubscription = componentRef.instance.close?.subscribe(res => {
      if (isMultiple) {
        this.selectedMediumArray[index] = res;
        this.selectedMediums.next(this.selectedMediumArray);
      }
      else {
        this.selectedMedium.next(res);
      }
      this.overlayRef?.detach();
      this.showMediumInfoSubscription?.unsubscribe();

    })
  }
}
