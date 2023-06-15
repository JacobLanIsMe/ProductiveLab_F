import { CommonService } from './../../../../@Service/common.service';
import { EmployeeService } from './../../../../@Service/employee.service';
import { DateService } from './../../../../@Service/date.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Common2Dto } from 'src/app/@Models/common2Dto.model';
@Component({
  selector: 'app-score-sperm',
  templateUrl: './score-sperm.component.html',
  styleUrls: ['./score-sperm.component.css']
})
export class ScoreSpermComponent implements OnInit, OnDestroy {
  constructor(private functionHeaderService: FunctionHeaderService, private operateSpermService: OperateSpermService, private dateService: DateService, private employeeService: EmployeeService, private commonService: CommonService){}
  ngOnDestroy(): void {
    this.spermScoreSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    switch (this.subfunction?.functionId){
      case 23:
        this.spermScoreTimePointId = 1;
        break;
      case 24:
        this.spermScoreTimePointId = 2;
        break;
      case 26:
        this.spermScoreTimePointId = 3;
        break;
      case 27:
        this.spermScoreTimePointId = 4;
        break;
    }
    this.courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    this.scoreSpermForm = new FormGroup({
      "volume": new FormControl(null, Validators.required),
      "concentration": new FormControl(null, Validators.required),
      "activityA": new FormControl(null, Validators.required),
      "activityB": new FormControl(null, Validators.required),
      "activityC": new FormControl(null, Validators.required),
      "activityD": new FormControl(null, Validators.required),
      "morphology": new FormControl(null),
      "abstinence": new FormControl(null),
      "spermScoreTimePointId": new FormControl(this.spermScoreTimePointId, Validators.required),
      "recordTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "courseOfTreatmentId": new FormControl(this.courseOfTreatmentId, Validators.required)
    });
    this.employeeService.getAllEmbryologist().subscribe(embryologists=>{
      if (embryologists){
        this.embryologists = embryologists;
      }
    })
    this.spermScoreSubscription = this.operateSpermService.allSpermScore.subscribe(res=>{
      res.forEach(x=>{
        if (x.spermScoreTimePointId == this.spermScoreTimePointId){
          this.hasExistingSpermScore = true;
          this.scoreSpermForm.patchValue({
            "volume": x.volume,
            "concentration": x.concentration,
            "activityA": x.activityA,
            "activityB": x.activityB,
            "activityC": x.activityC,
            "activityD": x.activityD,
            "morphology": x.morphology,
            "abstinence": x.abstinence,
            "recordTime": x.recordTime,
            "embryologist": x.embryologist
          });
        }
      })
    })
    if (this.courseOfTreatmentId){
      this.operateSpermService.getSpermScores(this.courseOfTreatmentId);
    }
    
  }
  @Input() subfunction: FunctionDto | undefined
  spermScoreSubscription?:Subscription;
  scoreSpermForm!: FormGroup;
  spermScoreTimePointId: number | undefined;
  embryologists?: Common2Dto[];
  hasExistingSpermScore: boolean = false;
  faStopwatch = faStopwatch;
  courseOfTreatmentId?: string | null;

  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(scoreSpermForm: FormGroup){
    if (this.hasExistingSpermScore){
      this.operateSpermService.updateExistingSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "更新", res.errorMessage, scoreSpermForm);
        if (this.courseOfTreatmentId){
          this.operateSpermService.getSpermScores(this.courseOfTreatmentId)
        }
      })
    }
    else{
      this.operateSpermService.addSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "新增", res.errorMessage, scoreSpermForm);
        if (this.courseOfTreatmentId){
          this.operateSpermService.getSpermScores(this.courseOfTreatmentId)
        }
      })
    }
  }
}
