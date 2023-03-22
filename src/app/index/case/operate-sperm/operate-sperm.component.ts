import { BaseOperateSpermInfoDto } from './../../../@Models/baseOperateSpermInfoDto.model';
import { MainPageService } from 'src/app/@Service/main-page.service';
import { OperateSpermService } from './../../../@Service/operate-sperm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operate-sperm',
  templateUrl: './operate-sperm.component.html',
  styleUrls: ['./operate-sperm.component.css']
})
export class OperateSpermComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService, private mainPageService: MainPageService){}
  ngOnInit(): void {
    this.operateSpermService.getOriginInfoOfSperm(this.mainPageService.selectedCourseId).subscribe(res=>{
      
      this.operateSpermInfo = res;
    })
  }
  operateSpermInfo?: BaseOperateSpermInfoDto;
}
