import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }

  // allRoute = []

  // hasId = new Subject<boolean>();
  // hasRouteIdParam(params: ParamMap){
  //   if (params.get("id")){
  //     this.hasId.next(true);
  //   }
  //   else{
  //     this.hasId.next(false);
  //   }
  // }
}
