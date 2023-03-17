import { MediumDto } from './../../../@Models/mediumDto.model';
import { ManageMediumService } from './../../../@Service/manage-medium.service';
import { DateService } from './../../../@Service/date.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faBoxesPacking, faClock, faList, faPerson, faWater } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ovum-pickup-note',
  templateUrl: './ovum-pickup-note.component.html',
  styleUrls: ['./ovum-pickup-note.component.css']
})
export class OvumPickupNoteComponent implements OnInit {
  constructor(private dateService: DateService, private manageMediumService: ManageMediumService){}
  ngOnInit(): void {
    
    this.ovumPickupForm = new FormGroup({
      "operationTime": new FormGroup({
        "triggerTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
        "startTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
        "endTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required)
      }),
      "ovumPickupResult": new FormGroup({
        "totalOvumNumber": new FormControl(0, Validators.required),
        "coc_Grade5": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade4": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade3": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade2": new FormControl(0, [Validators.required, Validators.min(0)]),
        "coc_Grade1": new FormControl(0, [Validators.required, Validators.min(0)]),
      }),
      "mediumInUseId": new FormControl("", Validators.required),
      "embryologist": new FormControl("", Validators.required),
      "incubator": new FormArray([this.createIncubatorFormGroup()]),
    })
    this.manageMediumService.getInUseMedium().subscribe(res=>{
      this.inUseMedium = res;
      console.log(this.inUseMedium);
    }) 
  }
  ovumPickupForm!: FormGroup;
  inUseMedium?: MediumDto;
  faClock = faClock;
  faList = faList;
  faBoxPacking = faBoxesPacking;
  faWater = faWater;
  faPerson = faPerson;
  onAddIncubator(){
    const newIncubatorFormGroup = this.createIncubatorFormGroup();
    (<FormArray>(this.ovumPickupForm.get("incubator"))).push(newIncubatorFormGroup);
  }
  getIncubatorFormArray(){
    return (<FormArray>(this.ovumPickupForm.get("incubator"))).controls;
  }
  createIncubatorFormGroup(){
    return new FormGroup({
      "incubatorId": new FormControl(null, [Validators.required, Validators.min(1)]),
      "ovumNumberFrom": new FormControl(0, [Validators.required, Validators.min(0)]),
      "ovumNumberTo": new FormControl(0, [Validators.required, Validators.min(0)])
    })
  }
  onSubmit(){

  }
  onDelete(formArrayIndex: number){
    (<FormArray>(this.ovumPickupForm.get("incubator"))).removeAt(formArrayIndex);
  }
}
