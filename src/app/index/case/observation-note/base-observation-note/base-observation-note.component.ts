import { MainPageService } from 'src/app/@Service/main-page.service';
import { ObservationNoteService } from './../../../../@Service/observation-note.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservationNoteDto } from 'src/app/@Models/observationNoteDot.model';
import { DateService } from 'src/app/@Service/date.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/@Service/common.service';
@Component({
  selector: 'app-base-observation-note',
  templateUrl: './base-observation-note.component.html',
  styleUrls: ['./base-observation-note.component.css']
})
export class BaseObservationNoteComponent implements OnInit, OnDestroy {
  constructor(private observationNoteService: ObservationNoteService, private mainPageService: MainPageService, private dateService:DateService, private commonService:CommonService){}
  ngOnDestroy(): void {
    this.observationNoteSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    const courseOfTreatmentId = this.commonService.getCourseOfTreatmentId();
    if (courseOfTreatmentId){
      this.observationNoteService.getObservationNote(courseOfTreatmentId).subscribe(res=>{
        this.observationNote = res;
        if (res.length > 0){
          for (let i = 0; i < 7; i++){
            this.observationDate.push(this.dateService.addObservationDate(res[0].ovumPickupDate, i));
          }
        }
      })
    }
    
    this.observationNoteSubscription = this.observationNoteService.observationNote.subscribe(res=>{
      this.observationNote = res;
    })
  }
  observationNoteSubscription?: Subscription;
  observationNote?: ObservationNoteDto[];
  observationDate: Date[] = [];
  faPlus = faPlus;
  onOpenObservationNoteForm(selectedOvumPickup: ObservationNoteDto, index: number){
    this.observationNoteService.openObservationNoteFormOrOpenExistingObservationNote(selectedOvumPickup, index);
    this.observationNoteService.isOpenObservationNoteForm.next(true);
  }
  onOpenExistingObservationNote(selectedOvumPickup: ObservationNoteDto, index:number, observationNoteId:string){
    this.observationNoteService.openObservationNoteFormOrOpenExistingObservationNote(selectedOvumPickup, index, observationNoteId);
    this.observationNoteService.isOpenExistingObservationNote.next(true);
  }
}
