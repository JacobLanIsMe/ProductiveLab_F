import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservationNoteDto } from '../@Models/observationNoteDot.model';
import { Subject } from 'rxjs';
import { CommonDto } from '../@Models/commonDto.model';
import { BlastomereScoreDto } from '../@Models/blastomereScoreDto.model';
import { BlastocystScoreDto } from '../@Models/blastocystScoreDto.model';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { GetObservationNoteDto } from '../@Models/getObservationNoteDto.model';
import { GetObservationNoteNameDto } from '../@Models/getObservationNoteNameDto';

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
  getOvumMaturation(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetOvumMaturation");
  }
  getObservationType(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetObservationType");
  }
  getOvumAbnormality(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetOvumAbnormality");
  }
  getFertilisationResult(){
    return this.http.get<CommonDto[]>("/api/ObservationNote/GetFertilisationResult");
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
}
