import { SearchStorageUnitComponent } from './index/case/search-storage-unit/search-storage-unit.component';
import { OvumBankTransferComponent } from './index/case/ovum-bank-transfer/ovum-bank-transfer.component';
import { UploadReportComponent } from './index/case/upload-report/upload-report.component';
import { ManageMediumComponent } from './index/case/manage-medium/manage-medium.component';
import { TransferInFromOtherComponent } from './index/case/transfer-in-from-other/transfer-in-from-other.component';
import { OperateSpermComponent } from './index/case/operate-sperm/operate-sperm.component';
import { FreezeSpermComponent } from './index/case/freeze-sperm/freeze-sperm.component';
import { ObservationNoteComponent } from './index/case/observation-note/observation-note.component';
import { ThawEmbryoComponent } from './index/case/thaw-embryo/thaw-embryo.component';
import { ThawOvumComponent } from './index/case/thaw-ovum/thaw-ovum.component';
import { OvumPickupNoteComponent } from './index/case/ovum-pickup-note/ovum-pickup-note.component';
import { FreezingSummaryComponent } from './index/case/freezing-summary/freezing-summary.component';
import { TreatmentSummaryComponent } from './index/case/treatment-summary/treatment-summary.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './index/main-page/main-page.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CaseComponent } from './index/case/case.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "index", component: IndexComponent, children:[
    {path: "main", component: MainPageComponent},
    {path: "case", component: CaseComponent, children:[
      {path: "treatmentSummary/:id", component: TreatmentSummaryComponent},
      {path: "freezingSummary/:id", component: FreezingSummaryComponent},
      {path: "ovumPickupNote/:id", component: OvumPickupNoteComponent},
      {path: "thawOvum/:id", component: ThawOvumComponent},
      {path: "thawEmbryo/:id", component: ThawEmbryoComponent},
      {path: "observationNote/:id", component: ObservationNoteComponent},
      {path: "freezeSperm/:id", component: FreezeSpermComponent},
      {path: "operateSperm/:id", component: OperateSpermComponent},
      {path: "transferInFromOther/:id", component: TransferInFromOtherComponent},
      {path: "manageMedium/:id", component: ManageMediumComponent},
      {path: "uploadReport/:id", component: UploadReportComponent},
      {path: "ovumBankTransfer/:id", component: OvumBankTransferComponent},
      {path: "searchStorageUnit/:id", component: SearchStorageUnitComponent},
      
    ]},
    
  ]},
  {path: "", redirectTo:"/index/main",pathMatch:"full"},
  {path: "*", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
