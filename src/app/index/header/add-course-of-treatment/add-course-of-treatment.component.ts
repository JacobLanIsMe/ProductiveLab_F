import { CommonService } from './../../../@Service/common.service';
import { TreatmentService } from './../../../@Service/treatment.service';
import { TreatmentDto } from './../../../@Models/treatmentDto.model';
import { DateService } from './../../../@Service/date.service';
import { EmployeeService } from './../../../@Service/employee.service';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { BaseCustomerInfoDto } from 'src/app/@Models/baseCustomerInfoDto.model';
import { CommonDto } from 'src/app/@Models/commonDto.model';

@Component({
  selector: 'app-add-course-of-treatment',
  templateUrl: './add-course-of-treatment.component.html',
  styleUrls: ['./add-course-of-treatment.component.css']
})
export class AddCourseOfTreatmentComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService, private employeeService:EmployeeService, private dateService:DateService, private treatmentService: TreatmentService, private commonService: CommonService){}
  ngOnInit(): void {
    this.employeeService.getAllDoctor().subscribe(res=>{
      this.doctors = res;
    })
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    })
    this.treatmentService.getGermCellSituations().subscribe(res=>{
      this.germCellSituations = res;
    })
    this.treatmentService.getGermCellSources().subscribe(res=>{
      this.germCellSources = res;
    })
    this.treatmentService.getGermCellOperations().subscribe(res=>{
      this.germCellOperations = res;
    })
    this.treatmentService.getSpermRetrievalMethods().subscribe(res=>{
      this.spermRetrievalMethods = res;
    })
    this.treatmentService.getAllCustomer().subscribe(res=>{
      this.customers = res;
    })
    this.addCourseOfTreatmentForm = new FormGroup({
      "doctorId": new FormControl(null, Validators.required),
      "customerId": new FormControl(null, Validators.required),
      "ovumSituationId": new FormControl("狀態"),
      "ovumSourceId": new FormControl("用途"),
      "ovumOperationId": new FormControl("操作"),
      "spermSituationId": new FormControl("狀態"),
      "spermSourceId": new FormControl("用途"),
      "spermOperationId": new FormControl("操作"),
      "SpermRetrievalMethodId": new FormControl("取經方式"),
      "embryoSituationId": new FormControl("狀態"),
      "embryoOperationId": new FormControl("操作"),
      "surgicalTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "memo": new FormControl(null),
    })

  }
  addCourseOfTreatmentForm!: FormGroup;
  doctors: EmbryologistDto[] = [];
  embryologists: EmbryologistDto[] = [];
  germCellSituations: CommonDto[] = [];
  germCellSources: CommonDto[] = [];
  germCellOperations: CommonDto[] = [];
  spermRetrievalMethods: CommonDto[] = [];
  customers: BaseCustomerInfoDto[] = [];
  onCancel(){
    this.functionHeaderService.isOpenAddCourseOfTreatment.next(false);
  }
  onSubmit(form: FormGroup){
    this.treatmentService.addCourseOfTreatment(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "新增療程", res.errorMessage, form);
    })
  }
}
