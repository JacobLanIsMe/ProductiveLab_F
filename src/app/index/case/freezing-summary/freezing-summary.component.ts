import { Component, OnInit } from '@angular/core';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-freezing-summary',
  templateUrl: './freezing-summary.component.html',
  styleUrls: ['./freezing-summary.component.css']
})
export class FreezingSummaryComponent implements OnInit{
  constructor(private freezeSummaryService:FreezeSummaryService){}
  ngOnInit(): void {
    this.freezeSummaryService.ovumFreezeSummarys.subscribe(res=>{
      this.ovumFreezeSummarys = res;
      this.ovumFreezeSummarys.forEach(x=>{
        x.isChecked = false;
      })
    })
    const courseOfTreatmentId = localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
    if (courseOfTreatmentId){
      this.freezeSummaryService.getOvumFreezeSummarys(courseOfTreatmentId);
    }
  }
  ovumFreezeSummarys:GetOvumFreezeSummaryDto[] = []
  isAllOvumChecked:boolean = false;
  faList = faList;
  onSelectAllOvum(event:any){
    this.ovumFreezeSummarys.forEach(x=>{
      x.isChecked = event.target.checked;
    })
  }
  onSelectOneOvum(event:any, unitId:number){
    this.ovumFreezeSummarys.forEach(x=>{
      if (x.freezeStorageInfo.unitInfo.storageUnitId === unitId){
        x.isChecked = event.target.checked;
      }
    })
    const index = this.ovumFreezeSummarys.findIndex(x=>x.isChecked === false);
    if (index !== -1){
      this.isAllOvumChecked = false;
    }
    else{
      this.isAllOvumChecked = true;
    }
  }
}
