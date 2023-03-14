import { FunctionDto } from './../../../@Models/function.model';
import { FunctionHeaderService } from './../../../@Service/function-header.service';
import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-function-header',
  templateUrl: './function-header.component.html',
  styleUrls: ['./function-header.component.css']
})
export class FunctionHeaderComponent implements OnInit {
  constructor(private functionHeaderService: FunctionHeaderService){}
  ngOnInit(): void {
    this.functionHeaderService.getFunctions().subscribe(response=>{
      this.functions = response;
      // this.faCoffee = response[0].icon;
      
    });
  }
  functions: FunctionDto[] = [];
  faCoffee = faCoffee;
}
