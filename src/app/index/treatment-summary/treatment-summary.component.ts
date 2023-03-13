import { RouteService } from './../../@Service/route.service';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(private route:ActivatedRoute, private routeService: RouteService){};
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.routeService.hasRouteIdParam(params);
    })
  }

}
