import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-multiple-medium-input',
  templateUrl: './multiple-medium-input.component.html',
  styleUrls: ['./multiple-medium-input.component.css']
})
export class MultipleMediumInputComponent implements OnInit, OnDestroy {
  constructor(private manageMediumService:ManageMediumService){}
  ngOnDestroy(): void {
    this.openMediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.openMediumSubscription = this.manageMediumService.isOpenMediumForm.subscribe(res=>{
      this.isOpenMediumForm = res;
    })
  }
  @Input() mediums:MediumDto[] = [];
  openMediumSubscription?:Subscription;
  faXmark = faXmark;
  isOpenMediumForm: boolean = false;
  count:number = 1;
  onAddMedium(){
    if (this.count < 3 && this.count <= this.manageMediumService.selectedMediumArray.length){
      this.count++
    }
  }
  onDeleteMediumFormControl(index:number){
    this.manageMediumService.selectedMediumArray.splice(index, 1);
    this.manageMediumService.selectedMediums.next(this.manageMediumService.selectedMediumArray);
    if (this.count>1){
      this.count--;
    }
  }
  onOpenMedium(){
    this.manageMediumService.isOpenMediumForm.next(true);
  }

}
