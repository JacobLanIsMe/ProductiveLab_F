import { TreatmentService } from './../../../@Service/treatment.service';
import { EmployeeService } from './../../../@Service/employee.service';
import { DateService } from './../../../@Service/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faClock, faList, faPerson } from '@fortawesome/free-solid-svg-icons';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { MainPageService } from 'src/app/@Service/main-page.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ovum-pickup-note',
  templateUrl: './ovum-pickup-note.component.html',
  styleUrls: ['./ovum-pickup-note.component.css']
})
export class OvumPickupNoteComponent implements OnInit {
  constructor(private dateService: DateService, private treatmentService: TreatmentService, private employeeService: EmployeeService, private mainPageService: MainPageService){}
  ngOnInit(): void {
    this.ovumPickupForm = new FormGroup({
      "operationTime": new FormGroup({
        "triggerTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
        "startTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
        "endTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required)
      }),
      "ovumPickupNumber": new FormGroup({
        "totalOvumNumber": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade5": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade4": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade3": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade2": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade1": new FormControl(0, [Validators.required, Validators.min(0)]),
      }),
      "embryologist": new FormControl("", Validators.required),
      "courseOfTreatmentId": new FormControl(this.mainPageService.selectedCourseId, Validators.required),
    });
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    });
  }
  ovumPickupForm!: FormGroup;
  embryologists?: EmbryologistDto[];
  isAlreadyAdded = false;
  faClock = faClock;
  faList = faList;
  faPerson = faPerson;
  onSubmit(form: FormGroup){
    this.treatmentService.addOvumPickupNote(form).subscribe(res=>{
      if (res.isSuccess){
        Swal.fire("新增取卵紀錄成功");
        this.isAlreadyAdded = true;
      }
      else{
        Swal.fire(res.errorMessage);
      }
    });
  }
}
