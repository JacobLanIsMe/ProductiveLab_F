import { TreatmentService } from './../../../../@Service/treatment.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { faList, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTreatmentInfoDto } from 'src/app/@Models/baseTreatmentInfoDto.model';
import { BlastomereScoreDto } from 'src/app/@Models/blastomereScoreDto.model';
import { BlastocystScoreDto } from 'src/app/@Models/blastocystScoreDto.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/@Service/common.service';
import { ObservationNotePhotoDto } from 'src/app/@Models/observationNotePhotoDto.model';
import { OperationTypeEnum } from 'src/app/@Enums/operationTypeEnum.model';
@Component({
  selector: 'app-observation-note-form',
  templateUrl: './observation-note-form.component.html',
  styleUrls: ['./observation-note-form.component.css']
})
export class ObservationNoteFormComponent implements OnInit {
  constructor(private sanitizer:DomSanitizer, private observationNoteService: ObservationNoteService, private dateService: DateService, private employeeService: EmployeeService, private treatmentService: TreatmentService, private commonService:CommonService) { }
  ngOnInit(): void {
    this.employeeService.getAllEmbryologist().subscribe(res => {
      this.embryologists = res;
    })
    this.observationNoteService.getOvumMaturation().subscribe(res => {
      this.ovumMaturations = res;
    })
    this.observationNoteService.getObservationType().subscribe(res => {
      this.observationTypes = res;
    })
    this.observationNoteService.getOvumAbnormality().subscribe(res => {
      this.ovumAbnormalities = res;
    })
    this.observationNoteService.getFertilisationResult().subscribe(res => {
      this.fertilisationResults = res;
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
    this.observationNoteService.getOperationType().subscribe(res => {
      this.operationTypes = res;
    })
    this.observationNoteForm = new FormGroup({
      "ovumPickupDetailId": new FormControl(this.observationNoteService.selectedOvumPickup?.ovumPickupDetailId, Validators.required),
      "observationTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "ovumMaturationId": new FormControl(null),
      "observationTypeId": new FormControl(null),
      "fertilisationResultId": new FormControl(null),
      "blastomereScore_C_Id": new FormControl("C"),
      "blastomereScore_G_Id": new FormControl("G"),
      "blastomereScore_F_Id": new FormControl("F"),
      "blastocystScore_Expansion_Id": new FormControl("Expansion"),
      "blastocystScore_ICE_Id": new FormControl("ICE"),
      "blastocystScore_TE_Id": new FormControl("TE"),
      "memo": new FormControl(null),
      "kidScore":new FormControl(null),
      "pgtaNumber": new FormControl(null),
      "pgtaResult": new FormControl(null),
      "pgtmResult": new FormControl(null),
      "spindleResult": new FormControl(null)
    })
    if (this.observationNoteService.selectedObservationNoteId){
      this.observationNoteService.getExistingObservationNote(this.observationNoteService.selectedObservationNoteId).subscribe(res=>{
        this.observationNoteForm.patchValue({
          "ovumPickupDetailId": res.ovumPickupDetailId,
          "embryologist":res.embryologist.toUpperCase(),
          "ovumMaturationId": res.ovumMaturationId,
          "observationTypeId": res.observationTypeId,
          "fertilisationResultId": res.fertilisationResultId,
          "blastomereScore_C_Id": res.blastomereScore_C_Id,
          "blastomereScore_G_Id": res.blastomereScore_G_Id,
          "blastomereScore_F_Id": res.blastomereScore_F_Id,
          "blastocystScore_Expansion_Id": res.blastocystScore_Expansion_Id,
          "blastocystScore_ICE_Id": res.blastocystScore_ICE_Id,
          "blastocystScore_TE_Id": res.blastocystScore_TE_Id,
          "memo": res.memo,
          "kidScore": res.kidScore,
          "pgtaNumber": res.pgtaNumber,
          "pgtaResult": res.pgtaResult,
          "pgtmResult": res.pgtmResult,
          "spindleResult": res.spindleResult
        });
        this.existingObservationNotePhotos = res.observationNotePhotos;
        JSON.parse(res.ovumAbnormalityId).forEach((x: number)=>{
          this.selectedOvumAbnormalityId.push(x);
        });
        JSON.parse(res.embryoStatusId).forEach((x:number)=>{
          this.selectedEmbryoStatusId.push(x);
        })
        JSON.parse(res.operationTypeId).forEach((x:number)=>{
          this.selectedOperationTypeId.push(x);
        });
      })
    }
  }
  @ViewChild("container",{read:ViewContainerRef}) container!: ViewContainerRef;
  observationNoteForm!: FormGroup;
  embryologists?: EmbryologistDto[];
  ovumMaturations?: CommonDto[];
  observationTypes?: CommonDto[];
  ovumAbnormalities?: CommonDto[];
  fertilisationResults?: CommonDto[];
  blastomereScore?: BlastomereScoreDto;
  embryoStatuses?: CommonDto[];
  blastocystScore?: BlastocystScoreDto;
  operationTypes?: CommonDto[];
  faList = faList;
  faCircleXmark = faCircleXmark;
  baseTreatmentInfo?: BaseTreatmentInfoDto = this.treatmentService.baseTreatmentInfo;
  selectedOvumPickup = this.observationNoteService.selectedOvumPickup;
  selectedDay = this.observationNoteService.selectedDay;
  selectedObservationNoteId = this.observationNoteService.selectedObservationNoteId;
  imgUrls: any[] = [];
  observationNotePhotos:any;
  existingObservationNotePhotos?: ObservationNotePhotoDto[];
  selectedMainPhotoIndex = 0;
  selectedOperationTypeId:number[] = [];
  selectedOvumAbnormalityId:number[] = [];
  selectedEmbryoStatusId:number[]=[];
  fileChange(event: any) {
    this.observationNotePhotos = event.target.files;
    this.imgUrls.length = 0;
    if (event.target.files.length === 0) {
      return;
    }
    else {
      for (let i = 0; i < event.target.files.length; i++){
        this.imgUrls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[i])));
      }
    }
  }
  onSelectMainPhoto(index:number, photoName?:string){
    if (this.existingObservationNotePhotos && this.existingObservationNotePhotos.length > 0){
      this.existingObservationNotePhotos.forEach(x=>{
        if (x.photoName === photoName){
          x.isMainPhoto = true;
        }
        else{
          x.isMainPhoto = false;
        }
      })
    }
    if (!photoName){
      this.selectedMainPhotoIndex = index;
    }
  }
  onSelectOperationType(id: number){
    const index =this.selectedOperationTypeId.findIndex(x=>x === id);
    if (index !== -1){
      this.selectedOperationTypeId.splice(index, 1);
    }
    else{
      this.selectedOperationTypeId.push(id);
    }
  }
  onSelectOvumAbnormality(id: number){
    const index = this.selectedOvumAbnormalityId.findIndex(x=>x === id);
    if (index !== -1){
      this.selectedOvumAbnormalityId.splice(index, 1);
    }
    else{
      this.selectedOvumAbnormalityId.push(id);
    }
  }
  onSelectEmbryoStatus(id:number){
    const index = this.selectedEmbryoStatusId.findIndex(x=>x===id);
    if (index !== -1){
      this.selectedEmbryoStatusId.splice(index, 1);
    }
    else{
      this.selectedEmbryoStatusId.push(id);
    }
  }
  isSelectedOperation(id:number){
    const index = this.selectedOperationTypeId.findIndex(x=>x===id);
    if (index !== -1){
      return true;
    }
    else{
      return false;
    }
  }
  isSelectedOvumAbnormality(id:number){
    const index = this.selectedOvumAbnormalityId.findIndex(x=>x===id);
    if (index !== -1){
      return true;
    }
    else{
      return false;
    }
  }
  isSelectedEmbryoStatus(id:number){
    const index = this.selectedEmbryoStatusId.findIndex(x=>x===id);
    if (index !== -1){
      return true;
    }
    else{
      return false;
    }
  }
  isSelectSpindle(){
    const index = this.selectedOperationTypeId.findIndex(x=>x === OperationTypeEnum.Spindle);
    if (index !== -1){
      return true;
    }
    else{
      return false;
    }
  }
  deletePhoto(photoName:string){
    if (this.existingObservationNotePhotos && this.existingObservationNotePhotos.length > 0){
      const deletePhotoIndex = this.existingObservationNotePhotos.findIndex(x=>x.photoName === photoName);
      if (deletePhotoIndex !== -1){
        this.existingObservationNotePhotos.splice(deletePhotoIndex, 1);
      }
    }
  }
  onCancel(){
    this.observationNoteService.isOpenObservationNoteForm.next(false);
  }
  onUpdate(observationNoteId:string){
    let formData = this.observationNoteService.generateFormData(this.observationNoteForm, this.selectedMainPhotoIndex, this.observationNotePhotos, this.selectedOperationTypeId, this.selectedOvumAbnormalityId, this.selectedEmbryoStatusId);
    formData.append("observationNoteId", observationNoteId);
    if (this.existingObservationNotePhotos && this.existingObservationNotePhotos.length > 0){
      formData.append("existingPhotos", JSON.stringify(this.existingObservationNotePhotos))
    }
    this.observationNoteService.updateObservationNote(formData).subscribe(res=>{
      this.commonService.judgeTheResponse(res, this.container, "更改觀察紀錄", res.errorMessage, this.observationNoteForm);
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.observationNoteService.showUpdatedObservationNote(courseOfTreatmentId);
      }
    });
  }
  
  onSubmit(form: FormGroup) {
    let formData = this.observationNoteService.generateFormData(form, this.selectedMainPhotoIndex, this.observationNotePhotos, this.selectedOperationTypeId, this.selectedOvumAbnormalityId, this.selectedEmbryoStatusId);
    this.observationNoteService.addObservationNote(formData).subscribe(res=>{
      this.commonService.judgeTheResponse(res, this.container,"新增觀察紀錄", res.errorMessage, this.observationNoteForm);
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.observationNoteService.showUpdatedObservationNote(courseOfTreatmentId);
      }
    })
  }
}
