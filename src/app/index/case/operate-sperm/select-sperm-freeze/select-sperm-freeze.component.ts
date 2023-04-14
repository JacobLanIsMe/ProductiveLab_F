import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { CommonService } from './../../../../@Service/common.service';
import { SpermFreezeDto } from './../../../../@Models/spermFreezeDto.model';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-sperm-freeze',
  templateUrl: './select-sperm-freeze.component.html',
  styleUrls: ['./select-sperm-freeze.component.css']
})
export class SelectSpermFreezeComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService){}
  ngOnInit(): void {
    if (this.operateSpermService.baseOperateSpermInfo?.spermFromCourseOfTreatmentId){
      this.operateSpermService.getSpermFreeze(this.operateSpermService.baseOperateSpermInfo?.spermFromCourseOfTreatmentId).subscribe(res=>{
        this.spermFreezes = res;
      })
    }
    
  }
  @ViewChild("container", {read:ViewContainerRef}) container!: ViewContainerRef;
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
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(){
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
        this.commonService.judgeTheResponse(res, this.container, "解凍精蟲", res.errorMessage);
        this.onCancel();
      })

    }
  }
}
