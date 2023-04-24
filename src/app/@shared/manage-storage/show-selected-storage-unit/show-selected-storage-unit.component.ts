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
export class ShowSelectedStorageUnitComponent implements OnInit, OnDestroy {
  constructor(private manageStorageService:ManageStorageService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.locationSubscription = this.manageStorageService.selectedLocations.subscribe(res=>{
      this.selectedLocations = res
    })
  }
  locationSubscription?: Subscription;
  selectedLocations:StorageLocation[] = [];
  faXmark = faXmark;
  onDeleteLocation(unitId: number){
    if (this.selectedLocations.length > 0){
      let index = this.selectedLocations.findIndex(x=>x.unitId == unitId);
      if (index === -1){
        this.commonService.showAlertMessage("", "選擇錯誤的欄位");
      }
      else{
        this.selectedLocations.splice(index, 1);
      }
    }
    else{
      return;
    }
    this.manageStorageService.selectedLocations.next(this.selectedLocations);
  }
}
