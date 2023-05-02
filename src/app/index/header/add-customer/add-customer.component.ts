import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDto } from 'src/app/@Models/commonDto.model';
import { AdminService } from 'src/app/@Service/admin.service';
import { CommonService } from 'src/app/@Service/common.service';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  constructor(private adminService:AdminService, private functionHeaderService:FunctionHeaderService, private commonService:CommonService){}
  ngOnInit(): void {
    this.addCustomerForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "genderId": new FormControl(null, Validators.required),
      "birthday": new FormControl(null, Validators.required),
      "spouseName": new FormControl(null),
      "spouseGenderId": new FormControl(null),
      "spouseBirthday": new FormControl(null)
    })
    this.adminService.getGenders().subscribe(res=>{
      this.genders = res;
    })
  }
  addCustomerForm!:FormGroup;
  genders: CommonDto[] = [];
  hasSpouse =false;
  onAddSpouse(){
    this.hasSpouse = !this.hasSpouse;
  }
  onCancel(){
    this.functionHeaderService.isOpenAddCustomer.next(false);
  }
  onSubmit(form:FormGroup){
    if (!this.hasSpouse){
      this.addCustomerForm.patchValue({
        "spouseName": null,
        "spouseGenderId": null,
        "spouseBirthday": null
      })
    }
    this.adminService.addCustomer(form).subscribe(res=>{
      this.commonService.judgeTheResponse(res, "新增客戶", res.errorMessage, form)
    });
  }
}
