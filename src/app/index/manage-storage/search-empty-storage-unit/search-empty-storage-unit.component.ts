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
  }
  storageTankStatuses?: StorageTankStatusDto[];
  storageUnitStatuses?: StorageUnitStatusDto[];
  tankType = "";
  width = 0;
  height = 0;
  showStorageUnitStatus(tankId:number, shelfId:number, tankTypeId: number){
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
    })
  }
}
