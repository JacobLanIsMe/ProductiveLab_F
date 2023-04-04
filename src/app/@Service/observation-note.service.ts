import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservationNoteDto } from '../@Models/observationNoteDot.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationNoteService {
  constructor(private http:HttpClient) { }
  getObservationNote(courseOfTreatmentId: string){
    return this.http.get<ObservationNoteDto[]>("/api/ObservationNote/GetObservationNote",{
      params: new HttpParams().append("courseOfTreatmentId", courseOfTreatmentId)
    })
  }
}
