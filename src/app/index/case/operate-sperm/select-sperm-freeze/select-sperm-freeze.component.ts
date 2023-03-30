import { CommonService } from './../../../../@Service/common.service';
import { SpermFreezeDto } from './../../../../@Models/spermFreezeDto.model';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-sperm-freeze',
  templateUrl: './select-sperm-freeze.component.html',
  styleUrls: ['./select-sperm-freeze.component.css']
})
export class SelectSpermFreezeComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService, private commonService:CommonService){}
  ngOnInit(): void {
    if (this.operateSpermService.baseOperateSpermInfo){
      this.spermFreezes = this.operateSpermService.baseOperateSpermInfo.spermFreezes;
    }
    // this.thawSpermFreezeForm = new FormGroup({
    //   "spermFreezes": new FormArray([])
    // })
  }
  // thawSpermFreezeForm!: FormGroup;
  spermFreezes: SpermFreezeDto[] = [];
  isSelectAll: boolean = false;
  faListCheck = faListCheck;
  selectedUnitIds: number[] = [];
  onSelectAll(event:any){
    if (event.target.checked){
      this.spermFreezes.forEach(x=>{
        x.isChecked = true;
      })
    }
    else{
      this.spermFreezes.forEach(x=>{
        x.isChecked = false;
      })
    }
  }
  onSelectLocation(){
    let arr = this.spermFreezes.filter(x=>!x.isChecked);
    if (arr.length > 0){
      this.isSelectAll = false;
    }
    else{
      this.isSelectAll = true;
    }
  }
  onCancel(){
    this.operateSpermService.isOpenSelectSpermFreeze.next(false);
  }
  onSubmit(){
    // let spermFreezesFormArray = <FormArray>(this.thawSpermFreezeForm.get("spermFreezes"));
    this.selectedUnitIds.length = 0;
    this.spermFreezes.forEach(x=>{
      if (x.isChecked){
        this.selectedUnitIds.push(x.storageUnitId);
      }
    })
    if (this.selectedUnitIds.length <= 0){
      Swal.fire("請選擇要解凍的精蟲");
    }
    else{
      this.operateSpermService.selectSpermFreeze(this.selectedUnitIds).subscribe(res=>{
        if (res.isSuccess){
          if (this.operateSpermService.baseOperateSpermInfo){
            this.spermFreezes.forEach(x=>{
              if (x.isChecked){
                let index = this.operateSpermService.baseOperateSpermInfo?.spermFreezes.findIndex(y=>y.spermFreezeId === x.spermFreezeId);
                if (index !== undefined && index >= 0){
                  this.operateSpermService.baseOperateSpermInfo?.spermFreezes.splice(index, 1);
                }
              }
            })
          }
          Swal.fire("解凍精蟲成功");
          this.onCancel();
        }
        else{
          Swal.fire(`解凍精蟲失敗\n${res.errorMessage}`);
        }
      })
    }
  }
}
