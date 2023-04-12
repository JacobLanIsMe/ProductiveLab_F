import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { DateService } from 'src/app/@Service/date.service';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-freeze-ovum',
  templateUrl: './freeze-ovum.component.html',
  styleUrls: ['./freeze-ovum.component.css']
})
export class FreezeOvumComponent implements OnInit {
  @Input() subfunction: FunctionDto|null = null;
  constructor(private dateService:DateService){}
  ngOnInit(): void {
    this.freezeOvumForm = new FormGroup({
      "ovumPickupDetailId": new FormControl(null, Validators.required),
      "freezeTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "embryologist": new FormControl(null, Validators.required),
      "storageUnitId": new FormControl(null, Validators.required),
      "mediumInUseId": new FormControl(null, Validators.required),
      "memo": new FormControl(null)
    })
  }
  freezeOvumForm!: FormGroup;
  faSnowflake = faSnowflake;

  onSubmit(form: FormGroup){

  }
}
