import { ManageStorageComponent } from './index/manage-storage/manage-storage.component';
import { OvumBankTransferComponent } from './index/ovum-bank-transfer/ovum-bank-transfer.component';
import { UploadReportComponent } from './index/case/upload-report/upload-report.component';
import { ManageMediumComponent } from './@shared/manage-medium/manage-medium.component';
import { TransferInFromOtherComponent } from './index/case/transfer-in-from-other/transfer-in-from-other.component';
import { OperateSpermComponent } from './index/case/operate-sperm/operate-sperm.component';
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
    {path: "manageMedium", component: ManageMediumComponent},
    {path: "manageStorage", component: ManageStorageComponent},
    {path: "ovumBankTransfer", component: OvumBankTransferComponent},
    {path: "case", component: CaseComponent, children:[
      {path: ":id/treatmentSummary", component: TreatmentSummaryComponent},
      {path: ":id/freezingSummary", component: FreezingSummaryComponent},
      {path: ":id/ovumPickupNote", component: OvumPickupNoteComponent},
      {path: ":id/thawOvum", component: ThawOvumComponent},
      {path: ":id/thawEmbryo", component: ThawEmbryoComponent},
      {path: ":id/observationNote", component: ObservationNoteComponent},
      {path: ":id/operateSperm", component: OperateSpermComponent},
      {path: ":id/transferInFromOther", component: TransferInFromOtherComponent},
      {path: ":id/uploadReport", component: UploadReportComponent},
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
