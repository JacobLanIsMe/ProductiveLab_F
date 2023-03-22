import { MainPageService } from 'src/app/@Service/main-page.service';
import { TreatmentService } from '../../@Service/treatment.service';
import { BaseTreatmentInfoDto } from '../../@Models/baseTreatmentInfoDto.model';
import { Component, OnInit } from '@angular/core';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-base-treatment-info',
  templateUrl: './base-treatment-info.component.html',
  styleUrls: ['./base-treatment-info.component.css']
})
export class BaseTreatmentInfoComponent implements OnInit {
  constructor(private treatmentService: TreatmentService,private mainPageService: MainPageService){}
  ngOnInit(): void {
    this.treatmentService.getBaseTreatmentInfo(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.baseTreatmentInfo = res;
    })
  }
  baseTreatmentInfo?: BaseTreatmentInfoDto;
  faFileInvoice = faFileInvoice;
}
