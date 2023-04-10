import { MainPageService } from 'src/app/@Service/main-page.service';
import { TreatmentService } from '../../@Service/treatment.service';
import { BaseTreatmentInfoDto } from '../../@Models/baseTreatmentInfoDto.model';
import { Component, OnInit } from '@angular/core';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';
import { CommonService } from 'src/app/@Service/common.service';
@Component({
  selector: 'app-base-treatment-info',
  templateUrl: './base-treatment-info.component.html',
  styleUrls: ['./base-treatment-info.component.css']
})
export class BaseTreatmentInfoComponent implements OnInit {
  constructor(private treatmentService: TreatmentService, private commonService:CommonService){}
  ngOnInit(): void {
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.treatmentService.getBaseTreatmentInfo(courseOfTreatmentId).subscribe(res=>{
        this.baseTreatmentInfo = res;
        this.treatmentService.baseTreatmentInfo = res;
      })
    }
  }
  baseTreatmentInfo?: BaseTreatmentInfoDto;
  faFileInvoice = faFileInvoice;
}
