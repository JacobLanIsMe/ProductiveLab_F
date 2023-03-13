import { RouteService } from './../../@Service/route.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private route: ActivatedRoute, private routeService: RouteService){}
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.paramsSubscription = this.routeService.hasId.subscribe(data=>{
      this.isTreatmentSummaryPage = data;
    })
  }
  paramsSubscription: Subscription | undefined;
  isTreatmentSummaryPage: boolean = false;
}
