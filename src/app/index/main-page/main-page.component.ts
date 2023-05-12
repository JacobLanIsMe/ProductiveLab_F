import { FunctionHeaderService } from './../../@Service/function-header.service';
import { Subscription } from 'rxjs';
import { MainPageService } from './../../@Service/main-page.service';
import { Component, OnInit } from '@angular/core';
import { MainPageDto } from 'src/app/@Models/mainPageDto.model';
import { LocalStorageKey } from 'src/app/@Models/localStorageKey.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private mainPageService: MainPageService){}
  ngOnInit(): void {
    this.mainPageService.GetLabMainPageInfo().subscribe(response=>{
      this.isLoading = false;
      this.mainPageInfos = response;
    });
  }
  mainPageInfos: MainPageDto[] = [];
  isLoading = true;
  onSelectCourse(courseId: string, courseOfTreatmentSqlId: number){
    localStorage.setItem(LocalStorageKey.courseOfTreatmentId, courseId);
    localStorage.setItem(LocalStorageKey.courseOfTreatmentSqlId, courseOfTreatmentSqlId.toString());
  }
}
