import { ManageIncubatorService } from './../../../../@Service/manage-incubator.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { Incubator } from 'src/app/@Models/incubator.model';
import { faBoxesPacking, faWater } from '@fortawesome/free-solid-svg-icons';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { IncubatorDto } from 'src/app/@Models/incubatorDto.model';

@Component({
  selector: 'app-fertilization',
  templateUrl: './fertilization.component.html',
  styleUrls: ['./fertilization.component.css']
})
export class FertilizationComponent implements OnInit {
  constructor(private manageMediumService: ManageMediumService, private manageIncubatorService: ManageIncubatorService){}
  ngOnInit(): void {
    this.fertilizationForm = new FormGroup({
      "mediumInUseId": new FormControl(null, Validators.required),
      "incubatorId": new FormControl(null, Validators.required)
    })
    this.manageIncubatorService.getAllIncubator().subscribe(res=>{
      this.incubators = res;
    });
    this.manageMediumService.getInUseMedium(1).subscribe(res=>{
      this.inUseMedium = res;
    });
  }
  fertilizationForm!: FormGroup;
  incubators?: IncubatorDto;
  inUseMedium?: MediumDto;
  faBoxPacking = faBoxesPacking;
  faWater = faWater;
}
