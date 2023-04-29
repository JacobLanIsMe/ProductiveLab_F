import { Subscription } from 'rxjs';
import { TreatmentService } from './../../../@Service/treatment.service';
import { Component, OnInit } from '@angular/core';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(private treatmentService: TreatmentService, private functionHeaderService: FunctionHeaderService){}
  ngOnInit(): void {
    const courseOfTreatmentId = localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
    if (courseOfTreatmentId){
      this.treatmentService.getTreatmentSummary(courseOfTreatmentId).subscribe(res=>{
        this.treatmentSummarys = res;
      })
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.treatmentSummary).subscribe(res=>{
      this.subfunctions = res;
    })
    this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      this.treatmentService.selectedOvumPickupDetails = this.treatmentSummarys.filter(x=>x.isChecked);
      this.isOpenSubFunction = res;
    })
    this.treatmentService.treatmentSummary.subscribe(res=>{
      this.treatmentSummarys = res;
    })
  }
  currentCourseOfTreatmentId: string | undefined;
  functionSubscription: Subscription | undefined ;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  isSelectAll: boolean = false;
  faTable = faTable;
  isOpenSubFunction: FunctionDto | null = null;
  subfunctions:FunctionDto[]=[];
  onSelectAll(event: any){
    if (event.target.checked){
      this.treatmentSummarys.forEach(x=>{
        x.isChecked = true;
      })
    }
    else{
      this.treatmentSummarys.forEach(x=>{
        x.isChecked = false;
      })
    }
  }

  onSelectOvum(){
    this.isSelectAll = this.treatmentService.isAllTreatmentSummaryChecked(this.treatmentSummarys);
  }


}
