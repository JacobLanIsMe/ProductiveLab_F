import { Subscription } from 'rxjs';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseOperateSpermInfoDto } from 'src/app/@Models/baseOperateSpermInfoDto.model';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { SpermScoreDto } from 'src/app/@Models/spermScoreDto.model';
import { CommonService } from 'src/app/@Service/common.service';
@Component({
  selector: 'app-base-operate-sperm-info',
  templateUrl: './base-operate-sperm-info.component.html',
  styleUrls: ['./base-operate-sperm-info.component.css']
})
export class BaseOperateSpermInfoComponent implements OnInit, OnDestroy {
  constructor(private operateSpermService: OperateSpermService, private commonService: CommonService){}
  ngOnDestroy(): void {
    this.spermScoreSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.spermScoreSubscription = this.operateSpermService.currentSpermScores.subscribe(res => {
      this.currentSpermScores = res;
    })
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    const spermFromCourseOfTreatmentId = this.commonService.getSpermFromCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.operateSpermService.getOriginInfoOfSperm(courseOfTreatmentId).subscribe(res=>{
        this.operateSpermService.baseOperateSpermInfo = res;
        this.baseOperateSpermInfo = res;
      });
      this.operateSpermService.getCurrentSpermScores(courseOfTreatmentId);
      if (spermFromCourseOfTreatmentId && courseOfTreatmentId.toUpperCase() != spermFromCourseOfTreatmentId.toUpperCase()){
        this.operateSpermService.getSpermScores(spermFromCourseOfTreatmentId).subscribe(res=>{
          this.operateSpermService.previousSpermScoreArray = res;
          this.previousSpermScores =res;
        });
      }
    }
  }
  spermScoreSubscription?: Subscription;
  baseOperateSpermInfo?: BaseOperateSpermInfoDto;
  faMicroscope = faMicroscope;
  currentSpermScores: SpermScoreDto[] = [];
  previousSpermScores: SpermScoreDto[] = [];
}
