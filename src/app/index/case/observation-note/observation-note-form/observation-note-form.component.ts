import { TreatmentService } from './../../../../@Service/treatment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { BaseTreatmentInfoDto } from 'src/app/@Models/baseTreatmentInfoDto.model';
import { BlastomereScoreDto } from 'src/app/@Models/blastomereScoreDto.model';
import { BlastocystScoreDto } from 'src/app/@Models/blastocystScoreDto.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/@Service/common.service';
import { MainPageService } from 'src/app/@Service/main-page.service';
@Component({
  selector: 'app-observation-note-form',
  templateUrl: './observation-note-form.component.html',
  styleUrls: ['./observation-note-form.component.css']
})
export class ObservationNoteFormComponent implements OnInit {
  constructor(private sanitizer:DomSanitizer, private observationNoteService: ObservationNoteService, private dateService: DateService, private employeeService: EmployeeService, private treatmentService: TreatmentService, private commonService:CommonService, private mainPageService:MainPageService) { }
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
      "ovumAbnormalityId": new FormControl(null),
      "fertilisationResultId": new FormControl(null),
      "blastomereScore_C_Id": new FormControl(null),
      "blastomereScore_G_Id": new FormControl(null),
      "blastomereScore_F_Id": new FormControl(null),
      "embryoStatusId": new FormControl(null),
      "blastocystScore_Expansion_Id": new FormControl(null),
      "blastocystScore_ICE_Id": new FormControl(null),
      "blastocystScore_TE_Id": new FormControl(null),
      "memo": new FormControl(null),
      "kidScore":new FormControl(null),
      "pgtaNumber": new FormControl(null),
      "pgtaResult": new FormControl(null),
      "pgtmResult": new FormControl(null),
      "operationTypeId": new FormControl(null)
    })
    if (this.observationNoteService.selectedObservationNoteId){
      this.observationNoteService.getExistingObservationNote(this.observationNoteService.selectedObservationNoteId).subscribe(res=>{
        this.observationNoteForm.patchValue({
          "ovumPickupDetailId": res.ovumPickupDetailId,
          "embryologist":res.embryologist.toUpperCase(),
          "ovumMaturationId": res.ovumMaturationId,
          "observationTypeId": res.observationTypeId,
          "ovumAbnormalityId": res.ovumAbnormalityId,
          "fertilisationResultId": res.fertilisationResultId,
          "blastomereScore_C_Id": res.blastomereScore_C_Id,
          "blastomereScore_G_Id": res.blastomereScore_G_Id,
          "blastomereScore_F_Id": res.blastomereScore_F_Id,
          "embryoStatusId": res.embryoStatusId,
          "blastocystScore_Expansion_Id": res.blastocystScore_Expansion_Id,
          "blastocystScore_ICE_Id": res.blastocystScore_ICE_Id,
          "blastocystScore_TE_Id": res.blastocystScore_TE_Id,
          "memo": res.memo,
          "kidScore": res.kidScore,
          "pgtaNumber": res.pgtaNumber,
          "pgtaResult": res.pgtaResult,
          "pgtmResult": res.pgtmResult,
          "operationTypeId": res.operationTypeId
        });
        
      })
    }
  }
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
  baseTreatmentInfo?: BaseTreatmentInfoDto = this.treatmentService.baseTreatmentInfo;
  selectedOvumPickup = this.observationNoteService.selectedOvumPickup;
  selectedDay = this.observationNoteService.selectedDay;
  selectedObservationNoteId = this.observationNoteService.selectedObservationNoteId;
  imgUrls: any[] = [];
  observationNotePhotos:any;
  selectedMainPhotoIndex = 0;
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
  onSelectMainPhoto(index:number){
    this.selectedMainPhotoIndex = index;
  }
  onCancel(){
    this.observationNoteService.isOpenObservationNoteForm.next(false);
  }
  onUpdate(observationNoteId:string){
    let formData = this.observationNoteService.generateFormData(this.observationNoteForm)
    formData.append("observationNoteId", observationNoteId);
    this.observationNoteService.updateObservationNote(formData).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "更改觀察紀錄");
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.observationNoteService.showUpdatedObservationNote(courseOfTreatmentId);
      }
      this.onCancel();
    });
  }
  onSubmit(form: FormGroup) {
    let formData = this.observationNoteService.generateFormData(form);
    
    formData.append("mainPhotoIndex", this.selectedMainPhotoIndex.toString());
    if (this.observationNotePhotos){
      for (let i = 0; i<this.observationNotePhotos.length; i++){
        formData.append("photos", this.observationNotePhotos[i]);
      }
    }
    this.observationNoteService.addObservationNote(formData).subscribe(res=>{
      this.commonService.judgeTheResponse(res,"新增觀察紀錄");
      const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
      if (courseOfTreatmentId){
        this.observationNoteService.showUpdatedObservationNote(courseOfTreatmentId);
      }
      this.onCancel();
    })
  }
}
