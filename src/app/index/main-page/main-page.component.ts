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
  constructor(private mainPageService: MainPageService){}
  ngOnDestroy(): void {
    this.mainPageInfoSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.mainPageInfoSubscription = this.mainPageService.mainPageInfos.subscribe(res=>{
      this.mainPageInfos = res;
    })
    this.mainPageService.GetLabMainPageInfo().subscribe(response=>{
      this.isLoading = false;
      this.mainPageInfos = response;
    });
  }
  mainPageInfoSubscription!: Subscription;
  mainPageInfos: MainPageDto[] = [];
  isLoading = true;
  onSelectCourse(courseId: string, courseOfTreatmentSqlId: number){
    localStorage.setItem(LocalStorageKey.courseOfTreatmentId, courseId);
    localStorage.setItem(LocalStorageKey.courseOfTreatmentSqlId, courseOfTreatmentSqlId.toString());
  }
}
