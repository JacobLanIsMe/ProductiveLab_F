import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { MainPageService } from './../../../@Service/main-page.service';
import { RouteService } from '../../../@Service/route.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.component.html',
  styleUrls: ['./treatment-summary.component.css']
})
export class TreatmentSummaryComponent implements OnInit {
  constructor(){};
  ngOnInit(): void {
    
  }
  
}
