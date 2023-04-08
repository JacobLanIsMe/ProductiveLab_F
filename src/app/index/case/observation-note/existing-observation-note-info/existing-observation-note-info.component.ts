import { ObservationNoteService } from 'src/app/@Service/observation-note.service';
import { Component, OnInit } from '@angular/core';
import { BaseTreatmentInfoDto } from 'src/app/@Models/baseTreatmentInfoDto.model';
import { TreatmentService } from 'src/app/@Service/treatment.service';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetObservationNoteNameDto } from 'src/app/@Models/getObservationNoteNameDto';
import { CommonService } from 'src/app/@Service/common.service';
import { MainPageService } from 'src/app/@Service/main-page.service';
@Component({
  selector: 'app-existing-observation-note-info',
  templateUrl: './existing-observation-note-info.component.html',
  styleUrls: ['./existing-observation-note-info.component.css']
})
export class ExistingObservationNoteInfoComponent implements OnInit {
  constructor(private observationNoteService:ObservationNoteService, private treatmentService:TreatmentService, private commonService:CommonService,private mainPageService:MainPageService){}
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
    if (this.observationNoteService.selectedObservationNoteId){
      this.observationNoteService.deleteObservationNote(this.observationNoteService.selectedObservationNoteId).subscribe(res=>{
        this.commonService.judgeTheResponse(res, "刪除觀察紀錄");
        this.observationNoteService.getObservationNote(this.mainPageService.selectedCourseId).subscribe(res=>{
          this.observationNoteService.observationNote.next(res);
        })
        this.onCancel();
      })
    }
    
  }
  onUpdate(){

  }
}
