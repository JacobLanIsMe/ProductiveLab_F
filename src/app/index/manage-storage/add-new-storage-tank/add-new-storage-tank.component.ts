import { CommonService } from './../../../@Service/common.service';
import { ManageStorageService } from './../../../@Service/manage-storage.service';
import { StorageTankTypeDto } from './../../../@Models/storageTankTypeDto.model';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-storage-tank',
  templateUrl: './add-new-storage-tank.component.html',
  styleUrls: ['./add-new-storage-tank.component.css']
})
export class AddNewStorageTankComponent implements OnInit {
  constructor(private manageStorageService: ManageStorageService, private commonService: CommonService){}
  ngOnInit(): void {
    this.addNewTankForm = new FormGroup({
      "tankName": new FormControl(null, Validators.required),
      "tankTypeId": new FormControl(null, Validators.required),
      "canistAmount": new FormControl(null, [Validators.required, Validators.min(1)]),
      "stripBoxAmount": new FormControl(null, [Validators.required, Validators.min(1)]),
      "unitAmount": new FormControl(null, [Validators.required, Validators.min(1)])
    })
    this.manageStorageService.getStorageTankType().subscribe(res=>{
      this.storageTankType = res;
    })
  }
  @ViewChild("container", {read:ViewContainerRef}) container!: ViewContainerRef;
  addNewTankForm!: FormGroup;
  storageTankType?: StorageTankTypeDto[];
  onSubmit(form: FormGroup){
    this.manageStorageService.addNewTank(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, this.container, "新增", res.errorMessage);
    })
  }
}
