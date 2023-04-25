import { Component, OnInit } from '@angular/core';
import { SpermFreezeDto } from 'src/app/@Models/spermFreezeDto.model';
import { CommonService } from 'src/app/@Service/common.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { OperateSpermService } from 'src/app/@Service/operate-sperm.service';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/@Service/date.service';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { EmployeeService } from 'src/app/@Service/employee.service';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { SpermThawMethodEnum } from 'src/app/@Enums/spermThawMethodEnum.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
@Component({
  selector: 'app-thaw-sperm',
  templateUrl: './thaw-sperm.component.html',
  styleUrls: ['./thaw-sperm.component.css']
})
export class ThawSpermComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService, private dateService: DateService, private employeeService: EmployeeService, private manageMediumService:ManageMediumService) { }
  ngOnInit(): void {
    this.thawSpermForm = new FormGroup({
      "thawTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "spermThawMethodId": new FormControl(null, Validators.required),
      "storageUnitId": new FormArray([]),
      "recheckEmbryologist": new FormControl(null, Validators.required),
      "otherSpermThawMethod": new FormControl(null),
      "mediumInUseIds": new FormArray([new FormControl(null)])
    })
    const spermFromCourseOfTreatmentId = this.commonService.getSpermFromCourseOfTreatmentId();
    if (spermFromCourseOfTreatmentId) {
      this.operateSpermService.getSpermFreeze(spermFromCourseOfTreatmentId).subscribe(res => {
        this.spermFreezes = res;
      })
    }
    this.employeeService.getAllEmbryologist().subscribe(res => {
      this.embryologists = res;
    })
    this.operateSpermService.getSpermThawMethods().subscribe(res => {
      this.spermThawMethods = res;
    })
  }
  thawSpermForm!: FormGroup;
  embryologists: EmbryologistDto[] = [];
  spermThawMethods: CommonDto[] = [];
  spermFreezes: SpermFreezeDto[] = [];
  isSelectAll: boolean = false;
  isOtherSpermThawMethod: boolean = false;
  faListCheck = faListCheck;
  selectedUnitIds: number[] = [];
  spermOwnerSqlId?: number = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerSqlId;
  spermOwnerName?: string = this.operateSpermService.baseOperateSpermInfo?.spermOwner.customerName;
  selectSpermThawMethod(event: any) {
    this.isOtherSpermThawMethod = +event.target.value === SpermThawMethodEnum.other ? true : false
  }
  getMediumFormArrayControl(){
    return (<FormArray>(this.thawSpermForm.get("mediumInUseIds"))).controls;
  }
  onSelectAll(event: any) {
    this.spermFreezes.forEach(x => {
      x.isChecked = event.target.checked;
    })
  }
  onSelectLocation() {
    let arr = this.spermFreezes.filter(x => !x.isChecked);
    this.isSelectAll = arr.length ? false : true;
  }
  onCancel() {
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(form: FormGroup) {
    this.selectedUnitIds.length = 0;
    this.spermFreezes.forEach(x => {
      if (x.isChecked) {
        this.selectedUnitIds.push(x.storageUnitId);
      }
    })
    if (this.selectedUnitIds.length <= 0) {
      this.commonService.showAlertMessage("", "請選擇要解凍的精蟲");
    }
    else {
      this.operateSpermService.selectSpermFreeze(this.selectedUnitIds).subscribe(res => {
        this.commonService.judgeTheResponse(res, "解凍精蟲", res.errorMessage);
        this.onCancel();
      })

    }
  }
}
