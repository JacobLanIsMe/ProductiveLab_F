import { CommonService } from './../../../@Service/common.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { StorageLocation } from 'src/app/@Models/storageLocation.model';
import { ManageStorageService } from 'src/app/@Service/manage-storage.service';

@Component({
  selector: 'app-show-selected-storage-unit',
  templateUrl: './show-selected-storage-unit.component.html',
  styleUrls: ['./show-selected-storage-unit.component.css']
})
export class ShowSelectedStorageUnitComponent {
  constructor(private manageStorageService:ManageStorageService, private commonService:CommonService){}
  selectedLocations:StorageLocation[] = this.manageStorageService.selectedLocationArray;
  faXmark = faXmark;
  onDeleteLocation(unitId: number){
    if (this.manageStorageService.selectedLocationArray.length > 0){
      let index = this.manageStorageService.selectedLocationArray.findIndex(x=>x.unitId == unitId);
      if (index === -1){
        this.commonService.showAlertMessage("", "選擇錯誤的欄位");
      }
      else{
        this.manageStorageService.selectedLocationArray.splice(index, 1);
      }
    }
    else{
      return;
    }
  }
}
