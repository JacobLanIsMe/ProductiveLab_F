import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteService } from './../../@Service/route.service';

import { MainPageService } from './../../@Service/main-page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageDto } from 'src/app/@Models/main-page.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  mainPageInfos: MainPageDto[] = [];
  constructor(private mainPageService: MainPageService, private routeService: RouteService, private route: ActivatedRoute){}
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.mainPageService.GetLabMainPageInfo().subscribe(response=>{
      this.mainPageInfos = response;
    });
    this.paramsSubscription = this.route.paramMap.subscribe(params=>{
      this.routeService.hasRouteIdParam(params);
    })
  }
  paramsSubscription: Subscription | undefined;

}
