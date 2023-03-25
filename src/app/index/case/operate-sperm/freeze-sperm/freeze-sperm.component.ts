import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freeze-sperm',
  templateUrl: './freeze-sperm.component.html',
  styleUrls: ['./freeze-sperm.component.css']
})
export class FreezeSpermComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
    this.freezeSpemForm = new FormGroup({
      "storageLocation": new FormControl(null, Validators.required)
    })
    
  }


  freezeSpemForm!: FormGroup;
  
}
