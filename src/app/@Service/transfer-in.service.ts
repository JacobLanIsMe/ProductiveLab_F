import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';

@Injectable({
  providedIn: 'root'
})
export class TransferInService {

  constructor(private http:HttpClient) { }
  addTransferIn(form:FormGroup){
    return this.http.post<BaseResponseDto>("/api/TransferIn/AddTransferIn", form.value);
  }
}
