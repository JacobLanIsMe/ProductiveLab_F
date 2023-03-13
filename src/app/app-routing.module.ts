import { TreatmentSummaryComponent } from './index/treatment-summary/treatment-summary.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './index/main-page/main-page.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "index", component: IndexComponent, children:[
    {path: "main", component: MainPageComponent},
    {path: ":id", component: TreatmentSummaryComponent},
  ]},
  {path: "", redirectTo:"/index/main",pathMatch:"full"},
  {path: "*", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
