import { Subject } from 'rxjs';
import { StorageTankStatusDto } from '../@Models/storageTankStatusDot.model';
import { BaseResponseDto } from './../@Models/baseResponseDto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageTankTypeDto } from '../@Models/storageTankTypeDto.model';
import { StorageUnitStatusDto } from '../@Models/storageUnitStatusDto.model';
import { StorageLocation } from '../@Models/storageLocation.model';

@Injectable({
  providedIn: 'root'
})
export class ManageStorageService {
  constructor(private http: HttpClient) { }

  selectedLocations = new Subject<StorageLocation[]>();
  
  addNewTank(form: FormGroup){
    return this.http.post<BaseResponseDto>("/api/StorageManager/AddStorageTank", form.value)
  }
  getStorageTankType(){
    return this.http.get<StorageTankTypeDto[]>("/api/StorageManager/GetStorageTankType")
  }
  getStorageTankStatus(){
    return this.http.get<StorageTankStatusDto[]>("/api/StorageManager/GetStorageTankStatus")
  }
  getStorageUnitStatus(tankId: number, canistId: number){
    return this.http.get<StorageUnitStatusDto[]>("/api/StorageManager/GetStorageUnitStatus", {
      params: new HttpParams().append("tankId", tankId).append("canistId", canistId)
    })
  }
}
