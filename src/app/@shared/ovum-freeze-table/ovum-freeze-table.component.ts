import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetOvumFreezeSummaryDto } from 'src/app/@Models/getOvumFreezeSummaryDto.model';
import { FreezeSummaryService } from 'src/app/@Service/freeze-summary.service';

@Component({
  selector: 'app-ovum-freeze-table',
  templateUrl: './ovum-freeze-table.component.html',
  styleUrls: ['./ovum-freeze-table.component.css']
})
export class OvumFreezeTableComponent {
  constructor(private freezeSummaryService:FreezeSummaryService){}
  @Input() ovumFreezes: GetOvumFreezeSummaryDto[] = []
  @Output() selectedOvumFreezes = new EventEmitter<GetOvumFreezeSummaryDto[]>();
  isAllOvumChecked = false;
  onSelectAllOvum(event:any){
    this.ovumFreezes.forEach(x=>{
      x.isChecked = event.target.checked;
    })
    this.selectedOvumFreezes.emit(this.ovumFreezes.filter(x=>x.isChecked));
  }
  onSelectOneOvum(event:any, storageUnitId:number){
    this.freezeSummaryService.checkOvumsOnSameTop(event, storageUnitId, this.ovumFreezes)
    const index = this.ovumFreezes.findIndex(x=>!x.isChecked);
    this.isAllOvumChecked = index === -1 ? true : false;
    this.selectedOvumFreezes.emit(this.ovumFreezes.filter(x=>x.isChecked));
  }
}
