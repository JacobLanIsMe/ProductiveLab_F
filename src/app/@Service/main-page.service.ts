import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainPageDto } from '../@Models/mainPageDto.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private http: HttpClient) { }

  mainPageInfos = new Subject<MainPageDto[]>;
  GetLabMainPageInfo(){
    return this.http.get<MainPageDto[]>("/api/LabMainPage/GetMainPageInfo");
  }
  GetUpdatedLabMainPageInfo(){
    this.GetLabMainPageInfo().subscribe(res=>{
      this.mainPageInfos.next(res);
    })
  }
}
