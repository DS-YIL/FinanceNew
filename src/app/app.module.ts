import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMeterialModule } from './angular-meterial/angular-meterial.module';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { NgMaterialMultilevelMenuModule } from "ng-material-multilevel-menu";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FileuploadComponent } from './ReportUpload/fileupload/fileupload.component';
import { DialogboxComponent } from './Dialogpopup/dialogbox/dialogbox.component';
import {OSReportComponent} from './ReportUpload/OSReport.component'
import {HighchartsChartComponent} from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import{SummaryReportComponent} from './ReportUpload/SummaryReport.component'
import{TableModule} from 'primeng/table';
import {MCReportComponent} from './ReportUpload/MCReport.component';
import { DsodashboardComponent } from './dso/dsodashboard/dsodashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    TestComponent,
    HomeComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    FileuploadComponent,
    DialogboxComponent,
    OSReportComponent,
    HighchartsChartComponent,
    SummaryReportComponent,
    MCReportComponent,
    DsodashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMeterialModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgMaterialMultilevelMenuModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
    ChartsModule,
    TableModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      disableTimeOut: true,
      newestOnTop: true,
      closeButton: true,
      countDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent,DialogboxComponent]
})
export class AppModule {}
