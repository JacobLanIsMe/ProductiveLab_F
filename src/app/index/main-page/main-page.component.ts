import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Subscription } from 'rxjs';
import { MainPageService } from './../../@Service/main-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageDto } from 'src/app/@Models/mainPageDto.model';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  mainPageInfos: MainPageDto[] = [];
  constructor(private mainPageService: MainPageService, private functionHeaderService: FunctionHeaderService){}
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.mainPageService.GetLabMainPageInfo().subscribe(response=>{
      this.mainPageInfos = response;
    });
  }
  paramsSubscription: Subscription | undefined;
  onSelectCourse(courseId: string, ovumFromCourseOfTreatmentId:string, spermFromCourseOfTreatmentId:string){
    localStorage.setItem(LocalStorageKey.courseOfTreatmentId, courseId);
    localStorage.setItem(LocalStorageKey.ovumFromCourseOfTreatmentId, ovumFromCourseOfTreatmentId);
    localStorage.setItem(LocalStorageKey.spermFromCourseOfTreatmentId, spermFromCourseOfTreatmentId);
    // this.functionHeaderService.selectedFunction.next(this.functionHeaderService.caseSpecificFunctions[0]);
  }
}
