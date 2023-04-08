import { MainPageService } from 'src/app/@Service/main-page.service';
import { ObservationNoteService } from './../../../../@Service/observation-note.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservationNoteDto } from 'src/app/@Models/observationNoteDot.model';
import { DateService } from 'src/app/@Service/date.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-base-observation-note',
  templateUrl: './base-observation-note.component.html',
  styleUrls: ['./base-observation-note.component.css']
})
export class BaseObservationNoteComponent implements OnInit, OnDestroy {
  constructor(private observationNoteService: ObservationNoteService, private mainPageService: MainPageService, private dateService:DateService){}
  ngOnDestroy(): void {
    this.observationNoteSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.observationNoteService.getObservationNote(this.mainPageService.selectedCourseId).subscribe(res=>{
      this.observationNote = res;
      for (let i = 0; i < 7; i++){
        this.observationDate.push(this.dateService.addObservationDate(res[0].ovumPickupDate, i));
      }
    })
    this.observationNoteSubscription = this.observationNoteService.observationNote.subscribe(res=>{
      this.observationNote = res;
    })
  }
  observationNoteSubscription?: Subscription;
  observationNote: ObservationNoteDto[] = [];
  observationDate: Date[] = [];
  faPlus = faPlus;
  onOpenObservationNoteForm(selectedOvumPickup: ObservationNoteDto, index: number){
    this.observationNoteService.selectedOvumPickup = selectedOvumPickup;
    this.observationNoteService.selectedDay = index;
    this.observationNoteService.isOpenObservationNoteForm.next(true);
  }
  onOpenExistingObservationNote(selectedOvumPickup: ObservationNoteDto, observationNoteId:string){
    this.observationNoteService.selectedOvumPickup = selectedOvumPickup;
    if (observationNoteId!==null){
      this.observationNoteService.selectedObservationNoteId = observationNoteId;
    }
    else{
      this.observationNoteService.selectedObservationNoteId = undefined;
    }
    this.observationNoteService.isOpenExistingObservationNote.next(true);
  }
}
