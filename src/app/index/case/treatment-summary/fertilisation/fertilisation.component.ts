import { Component, Input, OnInit } from '@angular/core';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/@Service/date.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-fertilisation',
  templateUrl: './fertilisation.component.html',
  styleUrls: ['./fertilisation.component.css']
})
export class FertilisationComponent implements OnInit {
  constructor(private dateService:DateService){}
  ngOnInit(): void {
    this.fertilisationForm = new FormGroup({
      "fertilisationTime": new FormControl(this.dateService.getTodayDateTimeString(new Date()), Validators.required),
      "fertilisationMethodId": new FormControl(null, Validators.required),
      "incubatorId": new FormControl(null, Validators.required),
      "otherIncubator": new FormControl(null),
      "mediumInUseIds": new FormArray([])
    })
  }
  @Input() subfunction: FunctionDto|null = null;
  faHeart = faHeart;
  fertilisationForm!: FormGroup;
}
