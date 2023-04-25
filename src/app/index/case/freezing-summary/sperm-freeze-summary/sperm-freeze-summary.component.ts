import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetSpermFreezeSummaryDto } from 'src/app/@Models/getSpermFreezeSummaryDto.model';
@Component({
  selector: 'app-sperm-freeze-summary',
  templateUrl: './sperm-freeze-summary.component.html',
  styleUrls: ['./sperm-freeze-summary.component.css']
})
export class SpermFreezeSummaryComponent implements OnInit {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService){}
  ngOnInit(): void {
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.freezeSummaryService.getSpermFreezeSummary(courseOfTreatmentId).subscribe(res=>{
        this.spermFreezeSummary = res;
      })
    }
  }
  spermFreezeSummary: GetSpermFreezeSummaryDto[] = [];
  faList = faList;
}
