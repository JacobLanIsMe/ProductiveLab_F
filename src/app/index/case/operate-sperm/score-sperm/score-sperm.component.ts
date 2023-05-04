import { CommonService } from './../../../../@Service/common.service';
import { EmployeeService } from './../../../../@Service/employee.service';
import { DateService } from './../../../../@Service/date.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
@Component({
  selector: 'app-score-sperm',
  templateUrl: './score-sperm.component.html',
  styleUrls: ['./score-sperm.component.css']
})
export class ScoreSpermComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private operateSpermService: OperateSpermService, private dateService: DateService, private employeeService: EmployeeService, private commonService: CommonService){}
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
    this.spermFromCourseOfTreatmentId = this.commonService.getSpermFromCourseOfTreatmentId();
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
    const existingSpermScores = this.operateSpermService.previousSpermScoreArray.concat(this.operateSpermService.currentSpermScoreArray);
    existingSpermScores.forEach(x=>{
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
          "embryologist": x.embryologist.toUpperCase()
        });
      }
    })
    
    if (this.courseOfTreatmentId && this.spermFromCourseOfTreatmentId && this.courseOfTreatmentId.toUpperCase() != this.spermFromCourseOfTreatmentId.toUpperCase() && (this.spermScoreTimePointId === 1 || this.spermScoreTimePointId === 2)){
      this.scoreSpermForm.disable();
    }
  }
  @Input() subfunction: FunctionDto | undefined
  scoreSpermForm!: FormGroup;
  spermScoreTimePointId: number | undefined;
  embryologists?: EmbryologistDto[];
  hasExistingSpermScore: boolean = false;
  faStopwatch = faStopwatch;
  courseOfTreatmentId?: string | null;
  spermFromCourseOfTreatmentId?: string | null;

  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(scoreSpermForm: FormGroup){
    if (this.hasExistingSpermScore){
      this.operateSpermService.updateExistingSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "更新", res.errorMessage, scoreSpermForm);
        if (this.courseOfTreatmentId){
          this.operateSpermService.getCurrentSpermScores(this.courseOfTreatmentId)
        }
      })
    }
    else{
      this.operateSpermService.addSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "新增", res.errorMessage, scoreSpermForm);
        if (this.courseOfTreatmentId){
          this.operateSpermService.getCurrentSpermScores(this.courseOfTreatmentId)
        }
      })
    }
  }
}
