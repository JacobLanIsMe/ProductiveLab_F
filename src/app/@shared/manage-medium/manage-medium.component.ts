import { DateService } from '../../@Service/date.service';
import { ManageMediumService } from '../../@Service/manage-medium.service';
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
  constructor(private manageMediumService: ManageMediumService, private dateService: DateService){}
  ngOnInit(): void {
    this.mediumForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "openDate": new FormControl(this.dateService.getTodayDateString(new Date()), Validators.required),
      "expirationDate": new FormControl(null, Validators.required),
      "lotNumber": new FormControl(null, Validators.required) 
    })
    this.dateService.getTodayTimeString(new Date());
  }
  mediumForm!: FormGroup;
  faSquarePlus: IconDefinition = faSquarePlus;
  
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
