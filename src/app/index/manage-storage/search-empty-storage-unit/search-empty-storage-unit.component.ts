import { Subscription } from 'rxjs';
import { StorageLocation } from './../../../@Models/storageLocation.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageTankStatusDto } from 'src/app/@Models/storageTankStatusDot.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { StorageUnitStatusDto } from 'src/app/@Models/storageUnitStatusDto.model';

@Component({
  selector: 'app-search-empty-storage-unit',
  templateUrl: './search-empty-storage-unit.component.html',
  styleUrls: ['./search-empty-storage-unit.component.css']
})
export class SearchEmptyStorageUnitComponent implements OnInit, OnDestroy {
  constructor(private manageStorageService: ManageStorageService){}
  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.manageStorageService.getStorageTankStatus().subscribe(res=>{
      this.storageTankStatuses = res
    })
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res =>{
      this.selectedLocations = res;
    })
  }
  locationSubscription?: Subscription;
  storageTankStatuses?: StorageTankStatusDto[];
  storageUnitStatuses?: StorageUnitStatusDto[];
  tankType = "";
  width = 0;
  height = 0;
  selectedTankName = "";
  selectedShelfName = "";
  selectedCaneNameOrBoxName = "";
  selectedLocations: StorageLocation[] = []
  showStorageUnitStatus(tankId:number, tankName: string, shelfId:number, shelfName:string, tankTypeId: number){
    this.manageStorageService.getStorageUnitStatus(tankId, shelfId).subscribe(res=>{
      this.storageUnitStatuses = res;
      let length = res[0].storageUnitInfo.length;
      if (tankTypeId == 1){
        this.tankType = "Cane";
        this.width = length;
        this.height = 1
      }
      else{
        this.tankType = "Box";
        this.width = Math.sqrt(length);
        this.height = this.width;
      }
      this.storageUnitStatuses.forEach(x=>{
        x.unitInfoArray = [];
        for (let i = 0, j = 0; i<this.height;i++, j = j+this.width){
          x.unitInfoArray[i] = x.storageUnitInfo.slice(j, j+this.width)
        }
      })
    })
    this.selectedTankName = tankName;
    this.selectedShelfName = shelfName;
  }
  selectCaneIdOrBoxId(selectedCaneNameOrBoxName: string){
    this.selectedCaneNameOrBoxName = selectedCaneNameOrBoxName;
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
  add(event:any,storageUnitId:number, unitName: string){
    if (event.target.checked){
      this.selectedLocations.push(new StorageLocation(this.selectedTankName, this.selectedShelfName, this.selectedCaneNameOrBoxName, storageUnitId, unitName))
    }
    else{
      let index = this.selectedLocations.findIndex(x=>x.unitId === storageUnitId);
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
