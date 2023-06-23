import { Component, OnDestroy, OnInit } from '@angular/core';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { Subscription } from 'rxjs';
import { OperateSpermService } from 'src/app/@Service/operate-sperm.service';
import { CommonService } from 'src/app/@Service/common.service';

@Component({
  selector: 'app-operate-sperm',
  templateUrl: './operate-sperm.component.html',
  styleUrls: ['./operate-sperm.component.css']
})
export class OperateSpermComponent implements OnInit, OnDestroy {
  constructor(private functionHeaderService: FunctionHeaderService, private operateSpermService: OperateSpermService, private commonService: CommonService){}
  ngOnDestroy(): void {
    this.openSubfunctionSubscription?.unsubscribe();
    this.hasSpermFreezeSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.operateSpermService.hasSpermFreeze.subscribe(res=>{
      this.hasSpermFreeze = res;
    })
    let courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.operateSpermService.hasSpermFreezeByCourseOfTreatmentId(courseOfTreatmentId);
    }
    
    this.openSubfunctionSubscription = this.functionHeaderService.isOpenSubfunction.subscribe(subfunction=>{

      this.isOpenSubfunction = subfunction;
    })
  }
  openSubfunctionSubscription?: Subscription;
  hasSpermFreezeSubscription?: Subscription;
  isOpenSubfunction?: FunctionDto | null;
  hasSpermFreeze: boolean = false;
}
