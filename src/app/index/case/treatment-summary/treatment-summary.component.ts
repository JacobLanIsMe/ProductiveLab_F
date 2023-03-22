import { Subscription } from 'rxjs';
import { MainPageService } from './../../../@Service/main-page.service';
import { TreatmentService } from './../../../@Service/treatment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreatmentSummaryDto } from 'src/app/@Models/treatmentSummaryDto.model';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(private treatmentService: TreatmentService, private mainPageService: MainPageService){}
  
  
  ngOnInit(): void {
    this.treatmentService.getTreatmentSummary(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.treatmentSummarys = res;
    })
  }
  currentCourseOfTreatmentId: string | undefined;
  functionSubscription: Subscription | undefined ;
  treatmentSummarys: TreatmentSummaryDto[] = [];
  isSelectAll: boolean = false;
  faTable = faTable;
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
