import { Subscription } from 'rxjs';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { MainPageService } from './../../../../@Service/main-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseOperateSpermInfoDto } from 'src/app/@Models/baseOperateSpermInfoDto.model';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { SpermScoreDto } from 'src/app/@Models/spermScoreDto.model';
@Component({
  selector: 'app-base-operate-sperm-info',
  templateUrl: './base-operate-sperm-info.component.html',
  styleUrls: ['./base-operate-sperm-info.component.css']
})
export class BaseOperateSpermInfoComponent implements OnInit, OnDestroy {
  constructor(private operateSpermService: OperateSpermService, private mainPageService: MainPageService){}
  ngOnDestroy(): void {
    this.openScoreSpermSubscription?.unsubscribe();
    this.spermScoreSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.operateSpermService.getOriginInfoOfSperm(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.baseOperateSpermInfo = res;
      this.operateSpermService.baseOperateSpermInfo = res;
      this.operateSpermService.getExistingSpermScore(res.spermFromCourseOfTreatmentId)
    });
    this.spermScoreSubscription = this.operateSpermService.existingSpermScore.subscribe(res=>{
      this.existingSpermScores = res;
    });
  }

  isOpenSelectSpermFreeze: boolean = false;
  openScoreSpermSubscription?: Subscription;
  spermScoreSubscription?: Subscription;
  baseOperateSpermInfo?: BaseOperateSpermInfoDto;
  faMicroscope = faMicroscope;
  existingSpermScores?: SpermScoreDto[];
  onOpenSelectSpermFreeze(){
    this.operateSpermService.isOpenSelectSpermFreeze.next(true);
  }
  
}
