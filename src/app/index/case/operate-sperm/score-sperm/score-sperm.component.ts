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
@Component({
  selector: 'app-score-sperm',
  templateUrl: './score-sperm.component.html',
  styleUrls: ['./score-sperm.component.css']
})
export class ScoreSpermComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private operateSpermService: OperateSpermService, private dateService: DateService, private employeeService: EmployeeService){}
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
    }
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
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
    
  }
  
  @Input() subfunction: FunctionDto | undefined
  scoreSpermForm!: FormGroup;
  spermScoreTimePointId: number | undefined;
  embryologists?: EmbryologistDto[];
  faStopwatch = faStopwatch;

  onCancel(){
    this.functionHeaderService.isOpenSubfunction.next(null);
  }
  onSubmit(scoreSpermForm: FormGroup){
    this.operateSpermService.addSpermScore(scoreSpermForm).subscribe(res=>{
      if (res.isSuccess){
        Swal.fire("新增成功");
        this.onCancel();
      }
      else{
        Swal.fire("新增失敗");
      }
    })
  }
}
