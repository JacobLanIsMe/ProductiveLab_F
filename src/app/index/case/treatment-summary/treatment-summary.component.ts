import { Subscription } from 'rxjs';
import { MainPageService } from './../../../@Service/main-page.service';
import { TreatmentService } from './../../../@Service/treatment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionDto } from 'src/app/@Models/functionDto.model';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(private treatmentService: TreatmentService, private route:ActivatedRoute, private functionHeaderService: FunctionHeaderService){}
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const courseOfTreatmentId = params.get("id");
      if (courseOfTreatmentId){
        this.treatmentService.getTreatmentSummary(courseOfTreatmentId).subscribe(res=>{
          this.treatmentSummarys = res;
        })
      }
    })
    this.functionHeaderService.isOpenSubfunction.subscribe(res=>{
      this.isOpenSubFunction = res;
    })
  }
  currentCourseOfTreatmentId: string | undefined;
  functionSubscription: Subscription | undefined ;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  isSelectAll: boolean = false;
  faTable = faTable;
  isOpenSubFunction: FunctionDto | null = null;
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
