import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/@Service/date.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { MediumTypeEnum } from 'src/app/@Enums/mediumTypeEnum.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { CommonDto } from 'src/app/@Models/commonDto.model';
@Component({
  selector: 'app-transfer-in-from-other',
  templateUrl: './transfer-in-from-other.component.html',
  styleUrls: ['./transfer-in-from-other.component.css']
})
export class TransferInFromOtherComponent implements OnInit, OnDestroy {
  constructor(private dateService: DateService, private manageMediumService: ManageMediumService, private manageStorageService: ManageStorageService, private observationNoteService:ObservationNoteService) { }
  ngOnDestroy(): void {
    this.selectedMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.transferInForm = new FormGroup({
      "transferInTime": new FormControl(this.dateService.getTodayDateTimeString, Validators.required),
      "transferInCell": new FormControl(null, Validators.required),
      "germSource": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(null, Validators.required),
      "freezeMediumId": new FormControl(null, Validators.required),
      "otherFreezeMedium": new FormControl(null),
      "count": new FormControl(0, [Validators.required, Validators.min(0)]),
      "storageUnitIds": new FormArray([]),
      "ovumInfos": new FormArray([]),
      "embryoInfos": new FormArray([])
    });
    this.storageUnitIdFormArray = <FormArray>this.transferInForm.get("storageUnitIds");
    this.ovumInfosFormArray = <FormArray>this.transferInForm.get("ovumInfos");
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res => {
      this.ovumFreezeMediums = this.manageMediumService.getOvumFreezeAndOtherMediun(res);
      this.spermFreezeMediums = this.manageMediumService.getSpermFreezeAndOtherMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.selectedMediumSubscription = this.manageMediumService.selectedMedium.subscribe(res => {
      const selectedMedium = res === this.mockMedium ? null : res.mediumInUseId
      this.transferInForm.patchValue({
        "freezeMediumId": selectedMedium
      })
      this.isSelectOtherMedium = res.mediumTypeId === MediumTypeEnum.other ? true : false;
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res => {
      this.storageUnitIdFormArray.clear();
      res.forEach(x => {
        this.storageUnitIdFormArray.push(new FormControl(x.unitId));
      })
    })
    this.observationNoteService.getOvumMaturation().subscribe(res => {
      this.ovumMaturations = res;
    })
  }
  mediumSubscription?: Subscription;
  selectedMediumSubscription?: Subscription;
  locationSubscription?: Subscription;
  transferInForm!: FormGroup;
  storageUnitIdFormArray!: FormArray;
  ovumInfosFormArray!: FormArray;
  faDownload = faDownload;
  isSelectOtherMedium: boolean = false;
  ovumFreezeMediums: MediumDto[] = [];
  spermFreezeMediums: MediumDto[] = [];
  ovumMaturations: CommonDto[] = [];
  mockMedium = new MediumDto("", "", new Date(), new Date(), "", false, 0,);
  getOvumInfosFormArray(){
    return (<FormArray>this.transferInForm.get("ovumInfos")).controls;
  }
  onCellChange() {
    this.manageMediumService.selectedMedium.next(this.mockMedium);
  }
  onCountChange() {
    const count = this.transferInForm.value.count;
    const ovumInfosFormArrayCount = this.ovumInfosFormArray.controls.length;
    const dif = count - ovumInfosFormArrayCount;
    for (let i = 0; i < Math.abs(dif); i++) {
      if (dif > 0) {
        this.ovumInfosFormArray.push(new FormGroup({
          "ovumMaturationId": new FormControl(null, Validators.required),
          "day": new FormControl(null, Validators.required)
        }))
      }
      if (dif < 0) {
        this.ovumInfosFormArray.removeAt(this.ovumInfosFormArray.controls.length - 1)
      }
    }
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
