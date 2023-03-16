import { ManageMediumService } from './../../@Service/manage-medium.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-medium',
  templateUrl: './manage-medium.component.html',
  styleUrls: ['./manage-medium.component.css']
})
export class ManageMediumComponent implements OnInit {
  constructor(private manageMediumService: ManageMediumService){}
  ngOnInit(): void {
    this.mediumForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "openDate": new FormControl(this.getTodayDate(), Validators.required),
      "expirationDate": new FormControl(null, Validators.required),
      "lotNumber": new FormControl(null, Validators.required) 
    })
  }
  mediumForm!: FormGroup;
  faSquarePlus: IconDefinition = faSquarePlus;
  getTodayDate(){
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth();
    const date = today.getDate();
    let newMonth = "";
    if (month !== 10 && month !== 11 && month !== 12){
      newMonth = `0${month+1}`;
    } 
    else {
      newMonth = `${month}`;
    }
    return `${year}-${newMonth}-${date}`;
  }

  getNameControl(){
    return this.mediumForm.controls["name"];
  }
  getOpenDateControl(){
    return this.mediumForm.controls["openDate"];
  }
  getExpirationDateControl(){
    return this.mediumForm.controls["expirationDate"];
  }
  getLotNumberControl(){
    return this.mediumForm.controls["lotNumber"];
  }
  onSubmit(mediumForm: FormGroup){
    this.manageMediumService.addMedium(mediumForm).subscribe(res=>{
      if (res.isSuccess){
        Swal.fire("新增培養液成功!");
        this.mediumForm.reset();
      }
      else{
        Swal.fire(`新增培養液失敗!\n${res.errorMessage}`);
      }
    });
  }
}
