import { FunctionDto } from './../../@Models/function.model';
import { HeaderService } from './../../@Service/header.service';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { RouteService } from './../../@Service/route.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private functionHeaderService: FunctionHeaderService, private headerService: HeaderService){}
  ngOnDestroy(): void {
    this.functionNameSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.functionNameSubscription = this.functionHeaderService.selectedFunctionName.subscribe(functionName => {
      this.functionName = functionName;
    })
    this.headerService.getCommonFunctions().subscribe(res=>{
      this.commonFunctions = res;
    })
  }
  functionNameSubscription: Subscription | undefined;
  functionName: string = "";
  commonFunctions: FunctionDto[] = [];
  isOpenManageMedium = false;
  isOpenOvumBankTransfer = false;
  isOpenSearchStorageUnit = false;
  isOpenLogout = false;
  onOpenComponent(functionName: string){
    this.resetOpenedComponent();
    switch(functionName){
      case "培養液管理":
        this.isOpenManageMedium = true;
        break;
      case "捐卵庫轉移":
        this.isOpenOvumBankTransfer = true;
        break;
      case "剩餘儲位查詢":
        this.isOpenSearchStorageUnit = true;
        break;
      case "登出":
        this.isOpenLogout = true;
        break;
    }
  }
  resetOpenedComponent(){
    this.isOpenManageMedium = false;
    this.isOpenOvumBankTransfer = false;
    this.isOpenSearchStorageUnit = false;
    this.isOpenLogout = false;
  }
}
