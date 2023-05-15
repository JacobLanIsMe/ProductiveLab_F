import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/@Service/date.service';

@Component({
  selector: 'app-transfer-in-from-other',
  templateUrl: './transfer-in-from-other.component.html',
  styleUrls: ['./transfer-in-from-other.component.css']
})
export class TransferInFromOtherComponent implements OnInit {
  constructor(private dateService:DateService){}
  ngOnInit(): void {
    this.transferInForm = new FormGroup({
      "transferInTime": new FormControl(this.dateService.getTodayDateTimeString,Validators.required),
      ""
    })
  }

  transferInForm!:FormGroup;
}
