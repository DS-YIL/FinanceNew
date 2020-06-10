import { Component, OnInit } from '@angular/core';
import {DynamicSearchResult,dsoinputmodel,ReportDocuments,osreport,OsReportAllDivisionDataModel,DateModel,summaryreportmodel} from 'src/app/Models/FinanceModels'
import {financeService} from 'src/app/FinanceService/Financeservices'
import {MatTableDataSource} from '@angular/material'
import{MatDialog,MatTable,MatPaginator} from '@angular/material'
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms'
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dsodashboard',
  templateUrl: './dsodashboard.component.html',
  styleUrls: ['./dsodashboard.component.css']
})
export class DsodashboardComponent implements OnInit {

  constructor(private financeservice:financeService,private formbuilder: FormBuilder) {
    this.divisiondata = new MatTableDataSource(this.divisiondata)
    this.regiondata=new MatTableDataSource(this.regiondata)
   }
  public alldivision:OsReportAllDivisionDataModel;
  public divsionlist:any;
  public dsoinput:dsoinputmodel;
  public regionlist:any;
  public regiondata:any;
  public divisiondata:any;
  displayedColumns: string[] = ['Region','CECI', 'PCI', 'SERVICE','SOLUTION','SYSTEMS','TAS','TMI','reportdate'];
  displayedColumns1: string[] = ['Division','Bangalore','Bangladesh','Baroda','Chennai','Kochi','Kolkatta','Nagpur','Mumbai','Delhi'];

  ngOnInit() {
    this.alldivision=new OsReportAllDivisionDataModel();
    this.LoadAlldivisions();
    this.LoadAllregions();
    this.GetDSOregionData(this.dsoinput);
    this.GetDSOdivisionData(this.dsoinput);
    this.dsoinput=new dsoinputmodel();
    this.regiondata=new Array<any>();
    this.divisiondata=new Array<any>();
  }
  LoadAlldivisions(){
    this.alldivision.Employeeno=190455;
    this.alldivision.Flag=1
    this.financeservice.getalldivisions(this.alldivision).subscribe(data=>{
           this.divsionlist=data;
    })
  }
  LoadAllregions(){
    this.alldivision.Employeeno=190455;
    this.alldivision.Flag=1
    this.financeservice.getallregions(this.alldivision).subscribe(data=>{
      this.regionlist=data;
    })
}
GetDSOregionData(model:dsoinputmodel){
  this.financeservice.GetDSOregionData(model).subscribe(data=>{
      this.regiondata=data;
  })
}
GetDSOdivisionData(model:dsoinputmodel){
  this.financeservice.GetDSOdivisionData(model).subscribe(data=>{
      this.divisiondata=data;
  })
}
}
