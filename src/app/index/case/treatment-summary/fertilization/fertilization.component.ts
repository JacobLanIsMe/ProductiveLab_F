import { ManageIncubatorService } from './../../../../@Service/manage-incubator.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageMediumService } from 'src/app/@Service/manage-medium.service';
import { faBoxesPacking, faWater } from '@fortawesome/free-solid-svg-icons';
import { MediumDto } from 'src/app/@Models/mediumDto.model';
import { IncubatorDto } from 'src/app/@Models/incubatorDto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fertilization',
  templateUrl: './fertilization.component.html',
  styleUrls: ['./fertilization.component.css']
})
export class FertilizationComponent implements OnInit, OnDestroy {
  constructor(private manageMediumService: ManageMediumService, private manageIncubatorService: ManageIncubatorService){}
  ngOnDestroy(): void {
    this.mediumSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.fertilizationForm = new FormGroup({
      "mediumInUseId": new FormControl(null, Validators.required),
      "incubatorId": new FormControl(null, Validators.required)
    })
    this.mediumSubscription = this.manageMediumService.updatedInUseMedium.subscribe(res=>{
      this.inUseMedium = this.manageMediumService.getRegularMedium(res);
    })
    this.manageMediumService.getUpdatedInUseMediums();
    this.manageIncubatorService.getAllIncubator().subscribe(res=>{
      this.incubators = res;
    });
    
  }
  mediumSubscription?:Subscription;
  fertilizationForm!: FormGroup;
  incubators?: IncubatorDto;
  inUseMedium: MediumDto[] = [];
  faBoxPacking = faBoxesPacking;
  faWater = faWater;
}
