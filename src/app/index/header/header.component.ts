import { FunctionDto } from '../../@Models/functionDto.model';
import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    // this.functionSubscription?.unsubscribe();
    this.openAddCourseOfTreatmentSubscription?.unsubscribe();
    this.openAddCustomerSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    // this.functionSubscription = this.functionHeaderService.selectedFunction.subscribe(selectedFunction=>{
    //   this.selectedFunction = selectedFunction;
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
    this.openAddCourseOfTreatmentSubscription = this.functionHeaderService.isOpenAddCourseOfTreatment.subscribe(res=>{
      this.isOpenAddCourseOfTreatment = res;
    })
    this.openAddCustomerSubscription = this.functionHeaderService.isOpenAddCustomer.subscribe(res=>{
      this.isOpenAddCustomer = res
    })
  }
  // functionSubscription: Subscription | undefined;
  // selectedFunction?: FunctionDto;
  commonFunctions: FunctionDto[] = [];
  isOpenAddCourseOfTreatment: boolean = false;
  openAddCourseOfTreatmentSubscription: Subscription | undefined;
  openAddCustomerSubscription: Subscription | undefined;
  isOpenAddCustomer: boolean=false;
  onBackToMain(){
    this.router.navigate(["/index", "main"]);
  }
  openAddCourseOfTreatment(){
    this.functionHeaderService.isOpenAddCourseOfTreatment.next(true);
  }
  openAddCustomer(){
    this.functionHeaderService.isOpenAddCustomer.next(true);
  }
}
