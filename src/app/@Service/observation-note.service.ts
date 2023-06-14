import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservationNoteDto } from '../@Models/observationNoteDot.model';
import { Subject } from 'rxjs';
import { CommonDto } from '../@Models/commonDto.model';
import { BlastomereScoreDto } from '../@Models/blastomereScoreDto.model';
import { BlastocystScoreDto } from '../@Models/blastocystScoreDto.model';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { GetObservationNoteDto } from '../@Models/getObservationNoteDto.model';
import { GetObservationNoteNameDto } from '../@Models/getObservationNoteNameDto.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ObservationNoteService {
  constructor(private http:HttpClient) { }
  isOpenObservationNoteForm = new Subject<boolean>();
  isOpenExistingObservationNote = new Subject<boolean>();
  observationNote = new Subject<ObservationNoteDto[]>();
  selectedOvumPickup?: ObservationNoteDto = undefined;
  selectedDay?: number;
  selectedObservationNoteId?: string;
  
  getObservationNote(courseOfTreatmentId: string){
    return this.http.get<ObservationNoteDto[]>("/api/ObservationNote/GetObservationNote",{
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
  showUpdatedObservationNote(courseOfTreatmentId:string){
    this.getObservationNote(courseOfTreatmentId).subscribe(res=>{
      this.observationNote.next(res);
    })
  }
  getOvumMaturation(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetOvumMaturation");
  }
  getObservationType(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetObservationType");
  }
  getOvumAbnormality(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetOvumAbnormality");
  }
  getFertilizationResult(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetFertilizationResult");
  }
  getBlastomereScore(){
    return this.http.get<BlastomereScoreDto>("/api/ObservationNote/GetBlastomereScore");
  }
  getEmbryoStatus(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetEmbryoStatus");
  }
  getBlastocystScore(){
    return this.http.get<BlastocystScoreDto>("/api/ObservationNote/GetBlastocystScore");
  }
  getOperationType(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetOperationType");
  }
  addObservationNote(formData:FormData){
    return this.http.post<BaseResponseDto>("/api/ObservationNote/AddObservationNote", formData);
  }
  getExistingObservationNote(observationNoteId: string){
    return this.http.get<GetObservationNoteDto>("/api/ObservationNote/GetExistingObservationNote", {
      params: new HttpParams().append("observationNoteId", observationNoteId)
    })
  }
  getExistingObservationNoteName(observationNoteId: string){
    return this.http.get<GetObservationNoteNameDto>("/api/ObservationNote/GetExistingObservationNoteName",{
      params: new HttpParams().append("observationNoteId", observationNoteId)
    })
  }
  deleteObservationNote(observationNoteId: string){
    return this.http.get<BaseResponseDto>("/api/ObservationNote/DeleteObservationNote",{
      params: new HttpParams().append("observationNoteId", observationNoteId)
    })
  }
  openObservationNoteFormOrOpenExistingObservationNote(selectedOvumPickup: ObservationNoteDto, index: number, observationNoteId?:string){
    this.selectedOvumPickup = selectedOvumPickup;
    this.selectedDay = index;
    if (observationNoteId){
      this.selectedObservationNoteId = observationNoteId;
    }
    else{
      this.selectedObservationNoteId = undefined;
    }
  }
  updateObservationNote(formData: FormData){
    return this.http.post<BaseResponseDto>("/api/ObservationNote/UpdateObservationNote", formData);
  }
  generateFormData(form:FormGroup, selectedMainPhotoIndex:number, observationNotePhotos:any, operationTypeId:number[], ovumAbnormalityId:number[], embryoStatusId:number[]){
    let formData = new FormData();
    formData.append("ovumDetailId", form.value.ovumDetailId);
    formData.append("observationTime", form.value.observationTime);
    formData.append("embryologist", form.value.embryologist);
    formData.append("ovumMaturationId", form.value.ovumMaturationId);
    formData.append("observationTypeId", form.value.observationTypeId);
    formData.append("ovumAbnormalityId", JSON.stringify(ovumAbnormalityId));
    formData.append("fertilizationResultId", form.value.fertilizationResultId);
    formData.append("blastomereScore_C_Id", form.value.blastomereScore_C_Id);
    formData.append("blastomereScore_G_Id", form.value.blastomereScore_G_Id);
    formData.append("blastomereScore_F_Id", form.value.blastomereScore_F_Id);
    formData.append("embryoStatusId", JSON.stringify(embryoStatusId));
    formData.append("blastocystScore_Expansion_Id", form.value.blastocystScore_Expansion_Id);
    formData.append("blastocystScore_ICE_Id", form.value.blastocystScore_ICE_Id);
    formData.append("blastocystScore_TE_Id", form.value.blastocystScore_TE_Id);
    formData.append("memo", form.value.memo);
    formData.append("kidScore", form.value.kidScore);
    formData.append("pgtaNumber", form.value.pgtaNumber);
    formData.append("pgtaResult", form.value.pgtaResult);
    formData.append("pgtmResult", form.value.pgtmResult);
    formData.append("operationTypeId", JSON.stringify(operationTypeId));
    formData.append("spindleResult", form.value.spindleResult);
    if (this.selectedDay){
      formData.append("day",this.selectedDay.toString());
    }
    formData.append("mainPhotoIndex", selectedMainPhotoIndex.toString());
    if (observationNotePhotos){
      for (let i = 0; i<observationNotePhotos.length; i++){
        formData.append("photos", observationNotePhotos[i]);
      }
    }
    return formData;
  }
  getFreezeObservationNotes(ovumDetailIds:string[]){
    return this.http.post<GetObservationNoteNameDto[]>("/api/ObservationNote/GetFreezeObservationNotes", ovumDetailIds);
  }
}
