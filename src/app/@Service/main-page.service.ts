import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainPageDto } from '../@Models/mainPageDto.model';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private http: HttpClient) { }
  mainPageInfos: MainPageDto[] = [];
  selectedCourseId: string = "";
  GetLabMainPageInfo(){
    return this.http.get<MainPageDto[]>("/api/LabMainPage/GetMainPageInfo");
  }

}
