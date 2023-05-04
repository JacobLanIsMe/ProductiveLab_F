import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageMediumService } from './@Service/manage-medium.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private manageMediumService:ManageMediumService){}
  ngOnDestroy(): void {
    this.openMediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.openMediumSubscription = this.manageMediumService.isOpenMediumForm.subscribe(res=>{
      this.isOpenMediumForm = res;
    })
  }
  openMediumSubscription?:Subscription;
  title = 'ProductiveLab_F';
  isOpenMediumForm = false;
}
