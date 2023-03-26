import { ManageStorageService } from 'src/app/@Service/manage-storage.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-freeze-sperm',
  templateUrl: './freeze-sperm.component.html',
  styleUrls: ['./freeze-sperm.component.css']
})
export class FreezeSpermComponent implements OnInit{
  constructor(private operateSpermService:OperateSpermService, private manageStorageService:ManageStorageService){}
  ngOnInit(): void {
    this.spermFromCourseOfTreatmentId = this.operateSpermService.baseOperateSpermInfo?.spermFromCourseOfTreatmentId;
    this.freezeSpermForm = new FormGroup({
      "courseOfTreatmentId": new FormControl(this.spermFromCourseOfTreatmentId, Validators.required),
      "mediumInUseId": new FormControl(null, Validators.required),
      "storageUnitId": new FormArray([]),
      "embryologist": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(null, Validators.required),
      "spermFreezeOperationMethodId": new FormControl(null, Validators.required)
    })
    this.manageStorageService.selectedUnitIds.subscribe(res=>{
      this.selectedUnitIds = res;
    })
  }
  freezeSpermForm!: FormGroup;
  spermFromCourseOfTreatmentId: string | undefined;
  spermOwner = this.operateSpermService.baseOperateSpermInfo?.spermOwner;
  faSnowflake = faSnowflake;
  selectedUnitIds: number[] = [];
  onSubmit(form: FormGroup){

  }
}
