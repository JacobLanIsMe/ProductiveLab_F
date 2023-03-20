import { FunctionDto } from '../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.functionSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.functionSubscription = this.functionHeaderService.selectedFunction.subscribe(selectedFunction=>{
      this.selectedFunction = selectedFunction;
    })
    // this.functionHeaderService.getCommonFunctions().subscribe(res=>{
    //   this.commonFunctions = res;
    //   this.functionHeaderService.commonFunctions = res;
    //   this.selectedFunction = res[0];
    // })
    // this.functionHeaderService.getCaseSpecificFunctions().subscribe(res=>{
    //   this.functionHeaderService.caseSpecificFunctions = res;
    // })
    this.functionHeaderService.getAllFunctions().subscribe(res=>{
      res.forEach(x=>{
        if (x.functionTypeId === 1){
          this.functionHeaderService.commonFunctions.push(x)
        }
        else{
          this.functionHeaderService.caseSpecificFunctions.push(x)
        }
      })
      this.commonFunctions = this.functionHeaderService.commonFunctions;
    })
  }
  functionSubscription: Subscription | undefined;
  selectedFunction?: FunctionDto;
  commonFunctions: FunctionDto[] = [];
  onBackToMain(){
    this.router.navigate(["/index", "main"]);
  }
}
