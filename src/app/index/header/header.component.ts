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
  constructor(private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.functionNameSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.functionNameSubscription = this.functionHeaderService.selectedFunctionName.subscribe(functionName => {
      this.functionName = functionName;
    })
  }
  functionNameSubscription: Subscription | undefined;
  functionName: string = "";
}
