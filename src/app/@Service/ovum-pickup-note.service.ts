import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OvumPickupNoteService {

  constructor(private http: HttpClient) { }
  getIncubator(){
    // return this.http.get<>
  }

}
