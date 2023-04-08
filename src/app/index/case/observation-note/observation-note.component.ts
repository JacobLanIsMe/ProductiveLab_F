import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservationNoteService } from 'src/app/@Service/observation-note.service';

@Component({
  selector: 'app-observation-note',
  templateUrl: './observation-note.component.html',
  styleUrls: ['./observation-note.component.css']
})
export class ObservationNoteComponent implements OnInit, OnDestroy {
  constructor(private observationNoteService: ObservationNoteService){}
  ngOnDestroy(): void {
    this.openObservationNoteFormSubscription?.unsubscribe();
    this.openExistingObservationNoteSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.openObservationNoteFormSubscription = this.observationNoteService.isOpenObservationNoteForm.subscribe(res=>{
      this.isOpenObservationNoteForm = res;
    })
    this.openExistingObservationNoteSubscription = this.observationNoteService.isOpenExistingObservationNote.subscribe(res=>{
      this.isOpenExistingObservationNote = res;
    })
  }
  isOpenObservationNoteForm: boolean = false;
  openObservationNoteFormSubscription?:Subscription;
  isOpenExistingObservationNote: boolean = false;
  openExistingObservationNoteSubscription?:Subscription;
}
