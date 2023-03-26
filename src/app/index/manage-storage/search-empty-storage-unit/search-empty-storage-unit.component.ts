import { StorageUnitDto } from './../../../@Models/storageUnitDto.model';
import { Component, OnInit } from '@angular/core';
import { StorageTankStatusDto } from 'src/app/@Models/storageTankStatusDot.model';
import { StorageUnitStatusDto } from 'src/app/@Models/storageUnitStatusDto.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';

@Component({
  selector: 'app-search-empty-storage-unit',
  templateUrl: './search-empty-storage-unit.component.html',
  styleUrls: ['./search-empty-storage-unit.component.css']
})
export class SearchEmptyStorageUnitComponent implements OnInit {
  constructor(private manageStorageService: ManageStorageService){}
  ngOnInit(): void {
    this.manageStorageService.getStorageTankStatus().subscribe(res=>{
      this.storageTankStatuses = res
    })
    this.manageStorageService.selectedUnitIds.subscribe(res =>{
      this.selectedUnitIds = res;
    })
  }
  storageTankStatuses?: StorageTankStatusDto[];
  storageUnitStatuses?: StorageUnitStatusDto[];
  tankType = "";
  width = 0;
  height = 0;
  
  selectedCaneIdOrBoxId = 0;
  selectedUnitIds: number[] = [];
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
  }
  selectCaneIdOrBoxId(selectedCaneIdOrBoxId: number){
    this.selectedCaneIdOrBoxId = selectedCaneIdOrBoxId;
    this.storageUnitStatuses?.forEach(x=>{
      if (x.caneIdOrBoxId == selectedCaneIdOrBoxId){
        x.unitInfoArray.forEach(y=>{
          y.forEach(z=>{
            this.selectedUnitIds.forEach(a=>{
              if (a === z.storageUnitId){
                z.isChecked = true;
              }
            })
          })
        })
      }
    })
  }
  add(storageUnitId:number){
    let index = this.selectedUnitIds.findIndex(x=>x === storageUnitId);
    if (index === -1){
      this.selectedUnitIds.push(storageUnitId);
    }
    else{
      this.selectedUnitIds.splice(index, 1);
    }
    this.manageStorageService.selectedUnitIds.next(this.selectedUnitIds);
  }

}
