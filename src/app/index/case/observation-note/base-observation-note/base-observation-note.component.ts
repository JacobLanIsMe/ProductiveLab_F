import { MainPageService } from 'src/app/@Service/main-page.service';
import { ObservationNoteService } from './../../../../@Service/observation-note.service';
import { Component, OnInit } from '@angular/core';
import { ObservationNoteDto } from 'src/app/@Models/observationNoteDot.model';
import { DateService } from 'src/app/@Service/date.service';

@Component({
  selector: 'app-base-observation-note',
  templateUrl: './base-observation-note.component.html',
  styleUrls: ['./base-observation-note.component.css']
})
export class BaseObservationNoteComponent implements OnInit {
  constructor(private observationNoteService: ObservationNoteService, private mainPageService: MainPageService, private dateService:DateService){}
  ngOnInit(): void {
    this.observationNoteService.getObservationNote(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.observationNote = res;
      // let date = new Date(res[0].ovumPickupDate);
      // console.log(new Date(date.setDate(date.getDate()+1)));
      for (let i = 0; i < 7; i++){
        this.observationDate.push(this.dateService.addObservationDate(res[0].ovumPickupDate, i));
      }
    })
  }
  observationNote?: ObservationNoteDto[];
  observationDate: Date[] = [];
}
