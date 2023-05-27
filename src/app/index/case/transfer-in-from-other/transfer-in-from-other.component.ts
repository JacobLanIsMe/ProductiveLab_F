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
import { BlastomereScoreDto } from 'src/app/@Models/blastomereScoreDto.model';
import { BlastocystScoreDto } from 'src/app/@Models/blastocystScoreDto.model';
import { TransferInService } from 'src/app/@Service/transfer-in.service';
import { CommonService } from 'src/app/@Service/common.service';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { EmployeeService } from 'src/app/@Service/employee.service';
@Component({
  selector: 'app-transfer-in-from-other',
  templateUrl: './transfer-in-from-other.component.html',
  styleUrls: ['./transfer-in-from-other.component.css']
})
export class TransferInFromOtherComponent implements OnInit, OnDestroy {
  constructor(private dateService: DateService, private manageMediumService: ManageMediumService, private manageStorageService: ManageStorageService, private observationNoteService:ObservationNoteService, private transferInService:TransferInService, private commonService:CommonService, private employeeService:EmployeeService) { }
  ngOnDestroy(): void {
    this.selectedMediumSubscription?.unsubscribe();
    this.mediumSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.transferInForm = new FormGroup({
      "courseOfTreatmentId": new FormControl(this.commonService.getCourseOfTreatmentId(),Validators.required),
      "transferInTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "transferInCellType": new FormControl(null, Validators.required),
      "germSourceId": new FormControl(null, Validators.required),
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
    this.embryoInfosFormArray = <FormArray>this.transferInForm.get("embryoInfos");
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
    this.observationNoteService.getFertilizationResult().subscribe(res=>{
      this.fertilizationResults = res;
    })
    this.observationNoteService.getBlastomereScore().subscribe(res => {
      this.blastomereScore = res;
    })
    this.observationNoteService.getEmbryoStatus().subscribe(res => {
      this.embryoStatuses = res;
    })
    this.observationNoteService.getBlastocystScore().subscribe(res => {
      this.blastocystScore = res;
    })
    this.employeeService.getAllEmbryologist().subscribe(res => {
      this.embryologists = res;
    })
  }
  mediumSubscription?: Subscription;
  selectedMediumSubscription?: Subscription;
  locationSubscription?: Subscription;
  transferInForm!: FormGroup;
  storageUnitIdFormArray!: FormArray;
  ovumInfosFormArray!: FormArray;
  embryoInfosFormArray!:FormArray;
  faDownload = faDownload;
  isSelectOtherMedium: boolean = false;
  ovumFreezeMediums: MediumDto[] = [];
  spermFreezeMediums: MediumDto[] = [];
  ovumMaturations: CommonDto[] = [];
  fertilizationResults: CommonDto[] = [];
  blastomereScore?: BlastomereScoreDto;
  embryoStatuses: CommonDto[] = [];
  embryologists: EmbryologistDto[] = [];
  blastocystScore?: BlastocystScoreDto;
  mockMedium = new MediumDto("", "", new Date(), new Date(), "", false, 0,);
  getOvumInfosFormArray(){
    return (<FormArray>this.transferInForm.get("ovumInfos")).controls;
  }
  getEmbryoInfosFormArray(){
    return (<FormArray>this.transferInForm.get("embryoInfos")).controls;
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
          "ovumMaturationId": new FormControl(null),
          "day": new FormControl(0)
        }))
        this.embryoInfosFormArray.push(new FormGroup({
          "fertilizationResultId": new FormControl(null),
          "blastomereScore_C_Id": new FormControl("C"),
          "blastomereScore_G_Id": new FormControl("G"),
          "blastomereScore_F_Id": new FormControl("F"),
          "embryoStatusIds": new FormArray([]),
          "blastocystScore_Expansion_Id": new FormControl("Expansion"),
          "blastocystScore_ICE_Id": new FormControl("ICE"),
          "blastocystScore_TE_Id": new FormControl("TE"),
          "day": new FormControl(null),
          "kidScore": new FormControl(null),
          "pgtaNumber": new FormControl(null),
          "pgtaResult": new FormControl(null),
          "pgtmResult": new FormControl(null)
        }))
      }
      if (dif < 0) {
        this.ovumInfosFormArray.removeAt(this.ovumInfosFormArray.controls.length - 1);
        this.embryoInfosFormArray.removeAt(this.embryoInfosFormArray.controls.length - 1);
      }
    }
  }
  onChangeEmbryoStatus(index: number, id: number){
    const embryoStatusFormArray = (<FormArray>this.embryoInfosFormArray.controls[index].get("embryoStatusIds"));
    const isExist = embryoStatusFormArray.value.findIndex((x:any) =>x === id)
    if (isExist === -1){
      embryoStatusFormArray.push(new FormControl(id));
    }
    else{
      embryoStatusFormArray.removeAt(isExist);
    }
  }
  onSubmit(form: FormGroup) {
    const transferInCellType = form.value.transferInCellType;
    const count = form.value.count;
    if (transferInCellType === '1'){
      for (let i = 0; i < count; i++){
        this.embryoInfosFormArray.controls[i].reset();
        let ovumFormControl = this.ovumInfosFormArray.controls[i]
        ovumFormControl.patchValue({
          "day": ovumFormControl.value.day === null ? null : ovumFormControl.value.day.toString()
        })
      }
    }
    else if (transferInCellType === '2'){
      for (let i = 0; i < count; i++){
        this.ovumInfosFormArray.controls[i].reset();
        let embryoFormControl = this.embryoInfosFormArray.controls[i]
        embryoFormControl.patchValue({
          "day": embryoFormControl.value.day === null ? null : embryoFormControl.value.day.toString(),
          "kidScore": embryoFormControl.value.day === null ? null : embryoFormControl.value.kidScore.toString(),
          "pgtaNumber": embryoFormControl.value.day === null ? null : embryoFormControl.value.pgtaNumber.toString()
        })
      }
    }
    else{
      for (let i = 0; i < count; i++){
        this.embryoInfosFormArray.controls[i].reset();
        this.ovumInfosFormArray.controls[i].reset();
      }
    }
    this.transferInService.addTransferIn(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "轉入", res.errorMessage, form);
    })
    // console.log(form.value);
  }
}
