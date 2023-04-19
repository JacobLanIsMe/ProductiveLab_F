import { TreatmentService } from './../../../@Service/treatment.service';
import { EmployeeService } from './../../../@Service/employee.service';
import { DateService } from './../../../@Service/date.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faClock, faList, faPerson, faFlask, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EmbryologistDto } from 'src/app/@Models/embryologistDto.model';
import { MainPageService } from 'src/app/@Service/main-page.service';
import Swal from 'sweetalert2';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { CommonService } from 'src/app/@Service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ovum-pickup-note',
  templateUrl: './ovum-pickup-note.component.html',
  styleUrls: ['./ovum-pickup-note.component.css']
})
export class OvumPickupNoteComponent implements OnInit, OnDestroy {
  constructor(private dateService: DateService, private treatmentService: TreatmentService, private employeeService: EmployeeService, private mainPageService: MainPageService, private manageMediumService: ManageMediumService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.mediumSubscription?.unsubscribe();
  }
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
      "mediumInUse": new FormArray([new FormControl(null, Validators.required)]),
      "embryologist": new FormControl("", Validators.required),
      "courseOfTreatmentId": new FormControl(this.commonService.getCourseOfTreatmentId(), Validators.required),
    });
    this.employeeService.getAllEmbryologist().subscribe(res=>{
      this.embryologists = res;
    });
    this.mediumSubscription = this.manageMediumService.updatedMedium.subscribe(res=>{
      this.mediums = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getInUseMediums();
    this.manageMediumService.isOpenMediumForm.subscribe(res=>{
      this.isOpenMediumForm = res;
    })
  }
  mediumSubscription?:Subscription;
  ovumPickupForm!: FormGroup;
  embryologists?: EmbryologistDto[];
  isAlreadyAdded = false;
  faClock = faClock;
  faList = faList;
  faPerson = faPerson;
  faFlask = faFlask;
  faXmark = faXmark;
  mediums: MediumDto[] = [];
  isOpenMediumForm = false;
  getMediumInUseArray(){
    return (<FormArray>(this.ovumPickupForm.get("mediumInUse"))).controls;
  }
  
  onOpenMediumInfo(event:MouseEvent){
    const target = event.target as HTMLElement;
    if (target.tagName === 'OPTION') {
      const select = target.parentNode as HTMLSelectElement;
      console.log('Mouse over option: ', select.value);
    }
  }
  onAddMedium(){
    (<FormArray>(this.ovumPickupForm.get("mediumInUse"))).push(new FormControl(null, Validators.required));
  }
  onOpenMedium(){
    this.manageMediumService.isOpenMediumForm.next(true);
  }
  onDeleteMedium(index:number){
    this.manageMediumService.deleteMediumFromFormArray(<FormArray>(this.ovumPickupForm.get("mediumInUse")), index);
  }
  onSubmit(form: FormGroup){
    this.treatmentService.addOvumPickupNote(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res,"新增取卵紀錄", res.errorMessage)
    });
  }
  
}
