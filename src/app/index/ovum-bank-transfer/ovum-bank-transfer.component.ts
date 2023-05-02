import { Component } from '@angular/core';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';

@Component({
  selector: 'app-ovum-bank-transfer',
  templateUrl: './ovum-bank-transfer.component.html',
  styleUrls: ['./ovum-bank-transfer.component.css']
})
export class OvumBankTransferComponent {
  constructor(private freezeSummaryService:FreezeSummaryService){}
  keyword?: string;
  donorOvumFreezes: GetOvumFreezeSummaryDto[] = [];
  searchResult?: string;
  onSearch(){
    this.freezeSummaryService.donorOvumFreezes.subscribe(res=>{
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
