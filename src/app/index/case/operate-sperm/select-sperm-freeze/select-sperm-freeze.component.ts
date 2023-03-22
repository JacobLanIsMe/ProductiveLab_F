import { SpermFreezeDto } from './../../../../@Models/spermFreezeDto.model';
import { OperateSpermService } from './../../../../@Service/operate-sperm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-sperm-freeze',
  templateUrl: './select-sperm-freeze.component.html',
  styleUrls: ['./select-sperm-freeze.component.css']
})
export class SelectSpermFreezeComponent implements OnInit {
  constructor(private operateSpermService: OperateSpermService){}
  ngOnInit(): void {
    if (this.operateSpermService.baseOperateSpermInfo){
      this.spermFreezes = this.operateSpermService.baseOperateSpermInfo.spermFreezes;
    }
    
  }
  spermFreezes: SpermFreezeDto[] = [];
}
