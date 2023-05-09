import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FunctionDto } from 'src/app/@Models/functionDto.model';
import { FunctionHeaderService } from 'src/app/@Service/function-header.service';
import { FunctionEnum } from 'src/app/@Enums/functionEnum.model';
import { CommonService } from 'src/app/@Service/common.service';
@Component({
  selector: 'app-ovum-bank-transfer',
  templateUrl: './ovum-bank-transfer.component.html',
  styleUrls: ['./ovum-bank-transfer.component.css']
})
export class OvumBankTransferComponent implements OnInit, OnDestroy {
  constructor(private freezeSummaryService: FreezeSummaryService, private functionHeaderService: FunctionHeaderService, private commonService: CommonService) { }
  ngOnDestroy(): void {
    this.donorOvumFreezesSubscription?.unsubscribe();
    this.freezeSummaryService.selectedDonorOvumFreezeArray.length = 0;
  }
  ngOnInit(): void {
    
    this.donorOvumFreezesSubscription = this.freezeSummaryService.donorOvums.subscribe(res => {
      this.isLoading = false;
      this.donorOvumFreezes = res;
      if (res.length) {
        this.searchResult = undefined;
      }
      else {
        this.searchResult = "查無此病歷號的捐贈卵子";
      }
    })
    this.functionHeaderService.getSubfunctions(FunctionEnum.ovumBankTransfer).subscribe(res => {
      this.ovumTransferSubfunctions = res;
    })
    this.functionHeaderService.isOpenSubfunction.subscribe(res => {
      if ((res?.functionId === 33 || res?.functionId === 34) && this.freezeSummaryService.selectedDonorOvumFreezeArray.length <= 0) {
        this.commonService.showAlertMessage("", "請選擇欲轉移的卵子");
        return;
      }
      this.isOpenSubfunction = res; 
    })
  }

  donorOvumFreezesSubscription?: Subscription;
  keyword?: string;
  donorOvumFreezes: GetOvumFreezeSummaryDto[] = [];
  searchResult?: string;
  isLoading = false;
  isOpenSubfunction: FunctionDto | null = null;
  faBuildingColumns = faBuildingColumns;
  ovumTransferSubfunctions: FunctionDto[] = [];
  onSearch() {
    this.searchResult = undefined;
    this.isLoading = true;
    this.donorOvumFreezes.length = 0;
    this.freezeSummaryService.getDonorOvums(Number(this.keyword))
  }
  onSelectedDonorOvumFreezes(event: GetOvumFreezeSummaryDto[]) {
    this.freezeSummaryService.selectedDonorOvumFreezeArray = event
  }
}
