import { FunctionHeaderService } from './../@Service/function-header.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(private router: Router, private functionHeaderService: FunctionHeaderService){
    this.router.events.subscribe(event => { 
      if(event instanceof NavigationEnd){
        let arr = event.url.split('/')
        this.functionHeaderService.getCurrentFunction(arr[arr.length-1]);
      }    
    })
  }
}
