import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
@Component({
  selector: 'app-ovum-bank-transfer',
  templateUrl: './ovum-bank-transfer.component.html',
  styleUrls: ['./ovum-bank-transfer.component.css']
})
export class OvumBankTransferComponent implements OnInit, OnDestroy {
  constructor(private freezeSummaryService:FreezeSummaryService, private functionHeaderService:FunctionHeaderService){}
  ngOnDestroy(): void {
    this.donorOvumFreezesSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.functionHeaderService.getSubfunctions(FunctionEnum.ovumBankTransfer).subscribe(res=>{
      this.ovumTransferSubfunctions = res;
    })
  }
  
  donorOvumFreezesSubscription?:Subscription;
  keyword?: string;
  donorOvumFreezes: GetOvumFreezeSummaryDto[] = [];
  searchResult?: string;
  isLoading = false;
  faBuildingColumns = faBuildingColumns;
  ovumTransferSubfunctions: FunctionDto[] = [];
  onSearch(){
    this.isLoading = true;
    this.donorOvumFreezesSubscription = this.freezeSummaryService.donorOvumFreezes.subscribe(res=>{
      this.isLoading = false;
      if (res.length){
        this.searchResult = undefined;
        this.donorOvumFreezes = res;
      }
      else{
        this.searchResult = "查無此病歷號的冷凍卵子";
      }
    })
    this.freezeSummaryService.getDonorOvumFreezes(Number(this.keyword))
    
  }
  onSelectedDonorOvumFreezes(event:GetOvumFreezeSummaryDto[]){
    this.freezeSummaryService.selectedDonorOvumFreezeArray = event
  }
}
