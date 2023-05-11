import { Subscription } from 'rxjs';
import { StorageLocation } from './../../../@Models/storageLocation.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StorageTankStatusDto } from 'src/app/@Models/storageTankStatusDot.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { TankTypeEnum } from 'src/app/@Enums/tankTypeEnum.model';
import { CommonService } from 'src/app/@Service/common.service';
import { BaseCustomerInfoDto } from 'src/app/@Models/baseCustomerInfoDto.model';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { OvumFreezeStorageDto } from 'src/app/@Models/ovumFreezeStorageDto.model';

@Component({
  selector: 'app-search-empty-storage-unit',
  templateUrl: './search-empty-storage-unit.component.html',
  styleUrls: ['./search-empty-storage-unit.component.css']
})
export class SearchEmptyStorageUnitComponent implements OnInit, OnDestroy {
 
  constructor(private manageStorageService: ManageStorageService, private commonService:CommonService, private treatmentService:TreatmentService){}
  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.manageStorageService.getStorageTankStatus().subscribe(res=>{
      this.storageTankStatuses = res;
      this.storageTankStatuses.forEach(x=>{
        let length = x.unitInfos[0].storageUnitInfo.length;
        let width = 0;
        let height = 0;
        if (x.tankInfo.tankTypeId === TankTypeEnum.strip){
          width = length;
          height = 1;
        }
        else{
          width = Math.sqrt(length);
          height = width;
        }
        x.unitInfos.forEach(y=>{
          y.unitInfoArray = [];
          for (let i = 0, j = 0; i < height; i++, j = j + width){
            y.unitInfoArray[i] = y.storageUnitInfo.slice(j, j+width)
          }
        })
      })
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res
    })
    if (this.selectedOvumDetailId){
      this.manageStorageService.getOvumFreezeStorageInfo(this.selectedOvumDetailId).subscribe(res=>{
        this.ovumFreezeStorages = res;
      })
      this.treatmentService.getOvumOwnerInfo(this.selectedOvumDetailId).subscribe(res=>{
        this.ovumOwner = res;
      })
    }
  }
  @Input() subfunction: FunctionDto|null = null;
  @Input() selectedOvumDetailId?: string;
  locationSubscription?:Subscription;
  storageTankStatuses?: StorageTankStatusDto[];
  selectedCanistId = 0;
  selectedStripIdOrBoxId:number = 0;
  selectedLocations: StorageLocation[] = []
  ovumFreezeStorages: OvumFreezeStorageDto[] = [];
  ovumOwner?: BaseCustomerInfoDto;
  showStorageUnitStatus(canistId:number){
    this.selectedCanistId = canistId;
  }
  selectStripIdOrBoxId(selectedStripIdOrBoxId: number){
    this.selectedStripIdOrBoxId = selectedStripIdOrBoxId;
  }
  confirmChecked(unitId: number){
    let index = this.selectedLocations.findIndex(x=>x.unitId === unitId);
    if (index === -1){
      return false;
    }
    else{
      return true;
    }
  }
  add(event:any, tankName:string, tankTypeId:number, canistName:string, stripBoxId:number,storageUnitId:number, unitName: string){
    if (event.target.checked){
      this.selectedLocations.push(new StorageLocation(tankName, tankTypeId, canistName, stripBoxId, storageUnitId, unitName));
    }
    else{
      let index =this.selectedLocations.findIndex(x=>x.unitId === storageUnitId);
      if (index === -1){
        return;
      }
      else{
        this.selectedLocations.splice(index, 1);
      }
    }
    this.manageStorageService.selectedLocations.next(this.selectedLocations);
    
  }
}
