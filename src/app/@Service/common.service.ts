import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageKey } from '../@Models/localStorageKey.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private route: ActivatedRoute) { }
  judgeTheResponse(res: BaseResponseDto, str: string){
    if (res.isSuccess){
      Swal.fire(`${str}成功`);
    }
    else{
      Swal.fire(`${str}失敗\n${res.errorMessage}`);
    }
  }
  getCourseOfTreatmentId(){
    return localStorage.getItem(LocalStorageKey.selectedCourseId);
  }
}
