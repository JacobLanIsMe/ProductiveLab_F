import { FunctionDto } from './../../@Models/function.model';
import { HeaderService } from './../../@Service/header.service';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { RouteService } from './../../@Service/route.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.functionSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.functionHeaderService.selectedFunction.subscribe(selectedFunction=>{
      this.selectedFunction = selectedFunction;
    })
    this.functionHeaderService.getCommonFunctions().subscribe(res=>{
      this.commonFunctions = res;
      this.functionHeaderService.commonFunctions = res;
      this.selectedFunction = res[0];
    })
    this.functionHeaderService.getCaseSpecificFunctions().subscribe(res=>{
      this.functionHeaderService.caseSpecificFunctions = res;
    })
  }
  functionSubscription: Subscription | undefined;
  selectedFunction?: FunctionDto;
  commonFunctions: FunctionDto[] = [];
  onOpenFunction(selectedFunction: FunctionDto){
    this.functionHeaderService.selectedFunction.next(selectedFunction);
  }
  onBackToMain(){
    this.functionHeaderService.selectedFunction.next(this.functionHeaderService.commonFunctions[0]);
    this.router.navigate(["/index", "main"]);
  }
}
