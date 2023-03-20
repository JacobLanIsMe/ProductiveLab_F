import { Subscription } from 'rxjs';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { MainPageService } from './../../../@Service/main-page.service';
import { TreatmentService } from './../../../@Service/treatment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { FunctionDto } from 'src/app/@Models/functionDto.model';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(private treatmentService: TreatmentService, private mainPageService: MainPageService, private functionHeaderService: FunctionHeaderService){}
  
  
  ngOnInit(): void {
    this.treatmentService.getTreatmentSummary(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.treatmentSummarys = res;
    })
    this.subfunctions = this.functionHeaderService.selectedFunctionDto?.subFunctions;
  }
  functionSubscription: Subscription | undefined ;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  subfunctions: FunctionDto[] | undefined ;
  isSelectAll: boolean = false;
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
