import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medium-input',
  templateUrl: './medium-input.component.html',
  styleUrls: ['./medium-input.component.css']
})
export class MediumInputComponent implements OnInit, OnDestroy {
  constructor(private manageMediumService:ManageMediumService){}
  ngOnDestroy(): void {
    this.selectedMediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    if (this.isMultiple){
      this.selectedMediumSubscription = this.manageMediumService.selectedMediums.subscribe(res=>{
        if (this.index + 1 <= res.length ){
          this.selectedMedium = res[this.index].name;
        }
        else{
          this.selectedMedium = "";
        }
      })
    }
    else{
      this.selectedMediumSubscription = this.manageMediumService.selectedMedium.subscribe(res=>{
        this.selectedMedium = res.name;
      })
    }
    
  }
  @Input() mediums:MediumDto[] = [];
  @Input() index:number = 0;
  @Input() isMultiple:boolean = false;
  @Input() name:string = "培養液"
  @ViewChild("origin", {static:true}) origin!: ElementRef;
  selectedMedium:string = "";
  selectedMediumSubscription?:Subscription;
  
  onOpenMediumInfo(){
    this.manageMediumService.openShowMediumInfo(this.origin, this.mediums, this.index, this.isMultiple);
  }
  onOpenMedium(){
    this.manageMediumService.isOpenMediumForm.next(true);
  }
}
