import { BaseOperateSpermInfoDto } from './../../../@Models/baseOperateSpermInfoDto.model';
import { MainPageService } from 'src/app/@Service/main-page.service';
import { OperateSpermService } from './../../../@Service/operate-sperm.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operate-sperm',
  templateUrl: './operate-sperm.component.html',
  styleUrls: ['./operate-sperm.component.css']
})
export class OperateSpermComponent implements OnInit, OnDestroy {
  constructor(private operateSpermService: OperateSpermService, private mainPageService: MainPageService, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.openSubfunctionSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.openSubfunctionSubscription = this.functionHeaderService.isOpenSubfunction.subscribe(subfunction=>{
      this.isOpenSubfunction = subfunction;
    })
  }
  openSubfunctionSubscription?: Subscription;
  isOpenSubfunction?: FunctionDto | null;
}
