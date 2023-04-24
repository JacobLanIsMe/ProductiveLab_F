import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { CommonService } from './../../../../@Service/common.service';
import { SpermFreezeDto } from './../../../../@Models/spermFreezeDto.model';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { Component, OnInit } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-select-sperm-freeze',
  templateUrl: './select-sperm-freeze.component.html',
  styleUrls: ['./select-sperm-freeze.component.css']
})
export class SelectSpermFreezeComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService){}
  ngOnInit(): void {
    const spermFromCourseOfTreatmentId = this.commonService.getSpermFromCourseOfTreatmentId();
    if (spermFromCourseOfTreatmentId){
      this.operateSpermService.getSpermFreeze(spermFromCourseOfTreatmentId).subscribe(res=>{
        this.spermFreezes = res;
      })
    }
  }
  spermFreezes: SpermFreezeDto[] = [];
  isSelectAll: boolean = false;
  faListCheck = faListCheck;
  selectedUnitIds: number[] = [];
  spermOwnerSqlId?: number = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerSqlId;
  spermOwnerName?: string = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerName;
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
      this.commonService.showAlertMessage("","請選擇要解凍的精蟲");
    }
    else{
      this.operateSpermService.selectSpermFreeze(this.selectedUnitIds).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "解凍精蟲", res.errorMessage);
        this.onCancel();
      })

    }
  }
}
