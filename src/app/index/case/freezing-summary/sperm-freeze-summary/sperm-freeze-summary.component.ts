import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@Service/common.service';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetSpermFreezeSummaryDto } from 'src/app/@Models/getSpermFreezeSummaryDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
@Component({
  selector: 'app-sperm-freeze-summary',
  templateUrl: './sperm-freeze-summary.component.html',
  styleUrls: ['./sperm-freeze-summary.component.css']
})
export class SpermFreezeSummaryComponent implements OnInit {
  constructor(private freezeSummaryService:FreezeSummaryService, private commonService:CommonService, private functionHeaderService: FunctionHeaderService){}
  ngOnInit(): void {
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.freezeSummaryService.getSpermFreezeSummary(courseOfTreatmentId).subscribe(res=>{
        this.isLoading = false;
        this.spermFreezeSummary = res;
        if (res.length <= 0){
          this.spermFreezeResult = "無相關資料"
        }
      })
    }
    this.functionHeaderService.getSubfunctions(FunctionEnum.freezingSummary).subscribe(res => {
      this.subfunctions = res.filter(x=>(x.functionId == FunctionEnum.spermTransferOut || x.functionId == FunctionEnum.discardSperm));
    })
  }
  spermFreezeSummary: GetSpermFreezeSummaryDto[] = [];
  faList = faList;
  isLoading = true;
  spermFreezeResult="";
  subfunctions: FunctionDto[] = [];
}
