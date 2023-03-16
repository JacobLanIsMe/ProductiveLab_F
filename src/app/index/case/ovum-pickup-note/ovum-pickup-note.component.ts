import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ovum-pickup-note',
  templateUrl: './ovum-pickup-note.component.html',
  styleUrls: ['./ovum-pickup-note.component.css']
})
export class OvumPickupNoteComponent implements OnInit {
  ngOnInit(): void {
    this.ovumPickupForm = new FormGroup({
      "operationTime": new FormGroup({
        "triggerTime": new FormControl("", Validators.required),
        "startTime": new FormControl("", Validators.required),
        "endTime": new FormControl("", Validators.required)
      }),
      "ovumPickupResult": new FormGroup({
        "totalOvumNumber": new FormControl(0, Validators.required),
        "coc_Grade5": new FormControl(0, Validators.required),
        "coc_Grade4": new FormControl(0, Validators.required),
        "coc_Grade3": new FormControl(0, Validators.required),
        "coc_Grade2": new FormControl(0, Validators.required),
        "coc_Grade1": new FormControl(0, Validators.required),
      }),
      "mediumInUseId": new FormControl("", Validators.required),
      "embryologist": new FormControl("", Validators.required),
      "incubator": new FormArray([this.createIncubatorFormGroup(1)]),
    })
  }
  ovumPickupForm!: FormGroup;
  onAddIncubator(incubatorId: number){
    const newIncubatorFormGroup = this.createIncubatorFormGroup(incubatorId);
    (<FormArray>(this.ovumPickupForm.get("incubor"))).push(newIncubatorFormGroup);
  }
  // getIncubatorFormArray(){
  //   return this.ovumPickupForm.get("incubator");
  // }
  createIncubatorFormGroup(incubatorId: number){
    return new FormGroup({
      "incubatorId": new FormControl(incubatorId, Validators.required),
      "ovumNumberFrom": new FormControl(0, Validators.required),
      "ovumNumberTo": new FormControl(0, Validators.required)
    })
  }
  onSubmit(){

  }
}
