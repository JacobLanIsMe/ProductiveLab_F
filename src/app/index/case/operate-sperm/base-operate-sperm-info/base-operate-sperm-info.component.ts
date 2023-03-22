import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { Subscription } from 'rxjs';
import { SpermFreezeDto } from './../../../../@Models/spermFreezeDto.model';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { MainPageService } from './../../../../@Service/main-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseOperateSpermInfoDto } from 'src/app/@Models/baseOperateSpermInfoDto.model';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
@Component({
  selector: 'app-base-operate-sperm-info',
  templateUrl: './base-operate-sperm-info.component.html',
  styleUrls: ['./base-operate-sperm-info.component.css']
})
export class BaseOperateSpermInfoComponent implements OnInit, OnDestroy {
  constructor(private operateSpermService: OperateSpermService, private mainPageService: MainPageService, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.openSelectSpermFreezeSubscription?.unsubscribe();
    this.openScoreSpermSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.operateSpermService.getOriginInfoOfSperm(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.baseOperateSpermInfo = res;
      this.operateSpermService.baseOperateSpermInfo = res;
    });
    this.openSelectSpermFreezeSubscription = this.operateSpermService.isOpenSelectSpermFreeze.subscribe(res=>{
      this.isOpenSelectSpermFreeze = res;
    })
    this.functionHeaderService.isOpenSubfunction.subscribe(subfunction=>{
      this.isOpenSubfunction = subfunction;
    })
  }
  openSelectSpermFreezeSubscription?: Subscription; 
  isOpenSelectSpermFreeze: boolean = false;
  openScoreSpermSubscription?: Subscription;
  isOpenSubfunction?: FunctionDto | null;
  baseOperateSpermInfo?: BaseOperateSpermInfoDto;
  faMicroscope = faMicroscope;
  
  onOpenSelectSpermFreeze(){
    this.operateSpermService.isOpenSelectSpermFreeze.next(true);
  }
  
}
