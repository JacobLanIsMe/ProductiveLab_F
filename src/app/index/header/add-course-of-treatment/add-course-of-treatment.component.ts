import { TreatmentService } from './../../../@Service/treatment.service';
import { TreatmentDto } from './../../../@Models/treatmentDto.model';
import { DateService } from './../../../@Service/date.service';
import { EmployeeService } from './../../../@Service/employee.service';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { BaseResponseDto } from './../../../@Models/baseResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';

@Component({
  selector: 'app-add-course-of-treatment',
  templateUrl: './add-course-of-treatment.component.html',
  styleUrls: ['./add-course-of-treatment.component.css']
})
export class AddCourseOfTreatmentComponent implements OnInit {
  constructor(private http:HttpClient, private functionHeaderService: FunctionHeaderService, private employeeService:EmployeeService, private dateService:DateService, private treatmentService: TreatmentService){}
  ngOnInit(): void {
    this.employeeService.getAllDoctor().subscribe(res=>{
      this.doctors = res;
    })
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.treatmentService.getAllTreatment().subscribe(res=>{
      this.treatments = res;
    })
    this.addCourseOfTreatmentForm = new FormGroup({
      "doctorId": new FormControl(null, Validators.required),
      "customerId": new FormControl(null, Validators.required),
      "treatmentId": new FormControl(null, Validators.required),
      "surgicalTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "memo": new FormControl(null),
    })

  }
  addCourseOfTreatmentForm!: FormGroup;
  doctors?: EmbryologistDto[];
  embryologists?: EmbryologistDto[];
  treatments?: TreatmentDto[];
  onCancel(){
    this.functionHeaderService.isOpenAddCourseOfTreatment.next(false);
  }
  onSubmit(form: FormGroup){
    this.http.post<BaseResponseDto>("", form.value)
  }
}
