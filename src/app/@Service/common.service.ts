import { ComponentFactoryResolver, Injectable, OnDestroy, ViewContainerRef } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { LocalStorageKey } from '../@Models/localStorageKey.model';
import { FormGroup } from '@angular/forms';
import { AlertMessageComponent } from '../@shared/alert-message/alert-message.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnDestroy {

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    if (this.alertMessageSubscription){
      this.alertMessageSubscription.unsubscribe();
    }
  }
  alertMessageSubscription?: Subscription;
  judgeTheResponse(res: BaseResponseDto, container: ViewContainerRef, title: string, description?: string, disableForm?:FormGroup){
    if (res.isSuccess){
      this.showAlertMessage(container, title + "成功", description);
      if (disableForm){
        disableForm.disable();
      }
    }
    else{
      this.showAlertMessage(container, title + "失敗", description);
    }
  }
  getCourseOfTreatmentId(){
    return localStorage.getItem(LocalStorageKey.courseOfTreatmentId);
  }
  getSpermFromCourseOfTreatmentId(){
    return localStorage.getItem(LocalStorageKey.spermFromCourseOfTreatmentId);
  }
  getOvumFromCourseOfTreatmentId(){
    return localStorage.getItem(LocalStorageKey.ovumFromCourseOfTreatmentId);
  }
  showAlertMessage(container: ViewContainerRef, title:string, description?:string){
    container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertMessageComponent);
    const containerRef = container.createComponent(componentFactory);
    containerRef.instance.title = title;
    if (description){
      containerRef.instance.description = description;
    }
    this.alertMessageSubscription = containerRef.instance.close.subscribe(()=>{
      containerRef.destroy();
      if (this.alertMessageSubscription){
        this.alertMessageSubscription.unsubscribe();
      }
    });
  }
}
