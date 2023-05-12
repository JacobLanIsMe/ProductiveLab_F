import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { LocalStorageKey } from '../@Models/localStorageKey.model';
import { FormGroup } from '@angular/forms';
import { AlertMessageComponent } from '../@shared/alert-message/alert-message.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnDestroy {
  constructor(private overlay:Overlay) { }
  ngOnDestroy(): void {
    if (this.alertMessageSubscription){
      this.alertMessageSubscription.unsubscribe();
    }
    this.showAlertSubscription?.unsubscribe();
  }
  alertMessageSubscription?: Subscription;
  judgeTheResponse(res: BaseResponseDto, title: string, description?: string, disableForm?:FormGroup){
    if (res.isSuccess){
      this.showAlertMessage(title + "成功", description);
      if (disableForm){
        disableForm.disable();
      }
    }
    else{
      this.showAlertMessage(title + "失敗", description);
    }
  }
  overlayRef?:OverlayRef;
  showAlertSubscription?:Subscription;
  showAlertMessage(title:string, description?:string){
    this.overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy:this.overlay.position().global().centerVertically().centerHorizontally()
    })
    const componentRef = this.overlayRef.attach(new ComponentPortal(AlertMessageComponent));
    componentRef.instance.title = title;
    componentRef.instance.description = description;
    
    this.showAlertSubscription = componentRef.instance.close.subscribe(()=>{
      this.overlayRef?.detach();
      this.showAlertSubscription?.unsubscribe();
    })
  }
  getCourseOfTreatmentId(){
    return localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
  }
  getCourseOfTreatmentSqlId(){
    return localStorage.getItem(LocalStorageKey.courseOfTreatmentSqlId);
  }
  
}
