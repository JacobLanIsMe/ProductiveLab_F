import { FunctionHeaderService } from './../../@Service/function-header.service';
import { FunctionHeaderComponent } from './../case/function-header/function-header.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteService } from './../../@Service/route.service';
import { MainPageService } from './../../@Service/main-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageDto } from 'src/app/@Models/main-page.model';
import { HeaderService } from 'src/app/@Service/header.service';

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
  onSelectCourse(courseId: string){
    this.mainPageService.selectedCourseId = courseId;
    this.functionHeaderService.selectedFunction.next(this.functionHeaderService.caseSpecificFunctions[0]);
  }
}
