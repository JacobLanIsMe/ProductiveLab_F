import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseResponseDto } from '../@Models/baseResponseDto.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  judgeTheResponse(res: BaseResponseDto, str: string){
    if (res.isSuccess){
      Swal.fire(`${str}成功`);
    }
    else{
      Swal.fire(`${str}失敗\n${res.errorMessage}`);
    }
  }
}
