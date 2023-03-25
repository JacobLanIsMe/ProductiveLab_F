import { CommonService } from './../../../../@Service/common.service';
import { MainPageService } from './../../../../@Service/main-page.service';
import { MainPageComponent } from './../../../main-page/main-page.component';
import { BaseResponseDto } from './../../../../@Models/baseResponseDto.model';
import { EmployeeService } from './../../../../@Service/employee.service';
import { DateService } from './../../../../@Service/date.service';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { FunctionHeaderService } from './../../../../@Service/function-header.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import Swal from 'sweetalert2';
import { SpermScoreDto } from 'src/app/@Models/spermScoreDto.model';
@Component({
  selector: 'app-score-sperm',
  templateUrl: './score-sperm.component.html',
  styleUrls: ['./score-sperm.component.css']
})
export class ScoreSpermComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private operateSpermService: OperateSpermService, private dateService: DateService, private employeeService: EmployeeService, private mainPageService: MainPageService, private commonService: CommonService){}
  ngOnInit(): void {
    switch (this.subfunction?.functionId){
      case 23:
        this.spermScoreTimePointId = 1;
        break;
      case 24:
        this.spermScoreTimePointId = 2;
        break;
      case 25:
        this.spermScoreTimePointId = 3;
        break;
      case 26:
        this.spermScoreTimePointId = 4;
        break;
    }
    
    
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
      "courseOfTreatmentId": new FormControl(this.operateSpermService.baseOperateSpermInfo?.spermFromCourseOfTreatmentId, Validators.required)
    });
    this.employeeService.getAllEmbryologist().subscribe(embryologists=>{
      if (embryologists){
        this.embryologists = embryologists;
      }
    })
    if (this.spermScoreTimePointId === 1 || this.spermScoreTimePointId === 2){
      this.operateSpermService.getExistingSpermScore(this.operateSpermService.baseOperateSpermInfo!.spermFromCourseOfTreatmentId, this.spermScoreTimePointId!).subscribe(res=>{
        if (res){
          this.existingSpermScore = res;
          this.scoreSpermForm.patchValue({
            "volume": res.volume,
            "concentration": res.concentration,
            "activityA": res.activityA,
            "activityB": res.activityB,
            "activityC": res.activityC,
            "activityD": res.activityD,
            "morphology": res.morphology,
            "abstinence": res.abstinence,
            "recordTime": res.recordTime
          });
        }
      })
    }
    if (this.mainPageService.selectedCourseId.toUpperCase() != this.operateSpermService.baseOperateSpermInfo!.spermFromCourseOfTreatmentId.toUpperCase() && (this.spermScoreTimePointId === 1 || this.spermScoreTimePointId === 2)){
      this.scoreSpermForm.disable();
    }
  }
  
  @Input() subfunction: FunctionDto | undefined
  scoreSpermForm!: FormGroup;
  spermScoreTimePointId: number | undefined;
  embryologists?: EmbryologistDto[];
  existingSpermScore?: SpermScoreDto;
  faStopwatch = faStopwatch;

  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(scoreSpermForm: FormGroup){
    if (this.existingSpermScore){
      this.operateSpermService.updateExistingSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "更新");
        this.onCancel();
      })
    }
    else{
      this.operateSpermService.addSpermScore(scoreSpermForm).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "新增");
        this.onCancel();
      })
    }
    
  }
  
}
