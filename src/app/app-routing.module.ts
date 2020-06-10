import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import {FileuploadComponent} from './ReportUpload/fileupload/fileupload.component'
import {OSReportComponent} from './ReportUpload/OSReport.component'
import {SummaryReportComponent} from './ReportUpload/SummaryReport.component'
import {MCReportComponent} from './ReportUpload/MCReport.component'
import {DsodashboardComponent} from './dso/dsodashboard/dsodashboard.component'
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, },
      { path: "test", component: TestComponent },
      {path:"uploadfile",component:FileuploadComponent},
      {path:"osreport",component:OSReportComponent},
      {path:"summaryreport",component:SummaryReportComponent},
      {path:"mcreport",component:MCReportComponent},
      {path:"dsodata",component:DsodashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
