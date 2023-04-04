import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './index/header/header.component';
import { MainPageComponent } from './index/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TreatmentSummaryComponent } from './index/case/treatment-summary/treatment-summary.component';
import { CaseComponent } from './index/case/case.component';
import { FunctionHeaderComponent } from './index/case/function-header/function-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FreezingSummaryComponent } from './index/case/freezing-summary/freezing-summary.component';
import { OvumPickupNoteComponent } from './index/case/ovum-pickup-note/ovum-pickup-note.component';
import { ThawOvumComponent } from './index/case/thaw-ovum/thaw-ovum.component';
import { ThawEmbryoComponent } from './index/case/thaw-embryo/thaw-embryo.component';
import { ObservationNoteComponent } from './index/case/observation-note/observation-note.component';
import { FreezeSpermComponent } from './index/case/operate-sperm/freeze-sperm/freeze-sperm.component';
import { TransferInFromOtherComponent } from './index/case/transfer-in-from-other/transfer-in-from-other.component';
import { ManageMediumComponent } from './index/manage-medium/manage-medium.component';
import { UploadReportComponent } from './index/case/upload-report/upload-report.component';
import { OvumBankTransferComponent } from './index/ovum-bank-transfer/ovum-bank-transfer.component';
import { OperateSpermComponent } from './index/case/operate-sperm/operate-sperm.component';
import { LogoutComponent } from './index/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FertilizationComponent } from './index/case/treatment-summary/fertilization/fertilization.component';
import { BaseTreatmentInfoComponent } from './@shared/base-treatment-info/base-treatment-info.component';
import { BaseOperateSpermInfoComponent } from './index/case/operate-sperm/base-operate-sperm-info/base-operate-sperm-info.component';
import { SelectSpermFreezeComponent } from './index/case/operate-sperm/select-sperm-freeze/select-sperm-freeze.component';
import { SubfunctionHeaderComponent } from './@shared/subfunction-header/subfunction-header.component';
import { ScoreSpermComponent } from './index/case/operate-sperm/score-sperm/score-sperm.component';
import { ManageStorageComponent } from './index/manage-storage/manage-storage.component';
import { AddNewStorageTankComponent } from './index/manage-storage/add-new-storage-tank/add-new-storage-tank.component';
import { SearchEmptyStorageUnitComponent } from './index/manage-storage/search-empty-storage-unit/search-empty-storage-unit.component';
import { AddCourseOfTreatmentComponent } from './index/header/add-course-of-treatment/add-course-of-treatment.component';
import { BaseObservationNoteComponent } from './index/case/observation-note/base-observation-note/base-observation-note.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    MainPageComponent,
    PageNotFoundComponent,
    TreatmentSummaryComponent,
    CaseComponent,
    FunctionHeaderComponent,
    FreezingSummaryComponent,
    OvumPickupNoteComponent,
    ThawOvumComponent,
    ThawEmbryoComponent,
    ObservationNoteComponent,
    FreezeSpermComponent,
    TransferInFromOtherComponent,
    OvumBankTransferComponent,
    OperateSpermComponent,
    ManageMediumComponent,
    UploadReportComponent,
    LogoutComponent,
    FertilizationComponent,
    BaseTreatmentInfoComponent,
    BaseOperateSpermInfoComponent,
    SelectSpermFreezeComponent,
    SubfunctionHeaderComponent,
    ScoreSpermComponent,
    ManageStorageComponent,
    AddNewStorageTankComponent,
    SearchEmptyStorageUnitComponent,
    AddCourseOfTreatmentComponent,
    BaseObservationNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
