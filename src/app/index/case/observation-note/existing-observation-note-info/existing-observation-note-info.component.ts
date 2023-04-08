import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { Component, OnInit } from '@angular/core';
import { GetObservationNoteDto } from 'src/app/@Models/getObservationNoteDto.model';
import { BaseTreatmentInfoDto } from 'src/app/@Models/baseTreatmentInfoDto.model';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetObservationNoteNameDto } from 'src/app/@Models/getObservationNoteNameDto';
@Component({
  selector: 'app-existing-observation-note-info',
  templateUrl: './existing-observation-note-info.component.html',
  styleUrls: ['./existing-observation-note-info.component.css']
})
export class ExistingObservationNoteInfoComponent implements OnInit {
  constructor(private observationNoteService:ObservationNoteService, private treatmentService:TreatmentService){}
  ngOnInit(): void {
    if (this.observationNoteService.selectedObservationNoteId){
      this.observationNoteService.getExistingObservationNoteName(this.observationNoteService.selectedObservationNoteId).subscribe(res=>{
        this.existingObservationNote = res;
        if (res.observationNotePhotos.length>0){
          res.observationNotePhotos.forEach(x=>{
            if (x.isMainPhoto){
              this.mainPhotoBase64String = x.imageBase64String;
            }
          })
        }
      })
    } 
  }
  existingObservationNote?: GetObservationNoteNameDto;
  mainPhotoBase64String?: string;
  baseTreatmentInfo?: BaseTreatmentInfoDto = this.treatmentService.baseTreatmentInfo;
  selectedOvumPickup = this.observationNoteService.selectedOvumPickup;
  faList = faList;
  onShowPhoto(photoBase64String:string){
    this.mainPhotoBase64String = photoBase64String;
  }
  onCancel(){
    this.observationNoteService.isOpenExistingObservationNote.next(false);
  }
  onDelete(){

  }
  onUpdate(){
    
  }
}
