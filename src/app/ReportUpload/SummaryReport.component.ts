import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {financeService} from 'src/app/FinanceService/Financeservices'
import {DynamicSearchResult,ReportDocuments,osreport,OsReportAllDivisionDataModel,DateModel,summaryreportmodel} from 'src/app/Models/FinanceModels'
import {MatTableDataSource} from '@angular/material'
import{MatDialog,MatTable,MatPaginator} from '@angular/material'
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms'
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import bar from 'highcharts/modules/funnel';
import { TableUtil } from "./TableUtil";
import * as XLSX from "xlsx";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
// import Highcharts from 'highcharts';

interface ReportType {
  value: string;
  viewValue: string;
}
interface datetype{
  value:number;
}
Exporting(Highcharts);
bar(Highcharts);
@Component({
  selector: 'app-SummaryReport',
  templateUrl: './SummaryReport.component.html',
})
export class SummaryReportComponent implements OnInit {
  constructor(private financeservice:financeService,private formbuilder: FormBuilder) {
    this.osreportdata=new MatTableDataSource(this.osreportdata)

   }
  date = new FormControl(new Date());
  @ViewChild('TABLE',{static: true}) table: ElementRef;
  @ViewChild(MatPaginator,{static: true}) paginator:MatPaginator;
  @ViewChild("container", { read: ElementRef, static: true }) container: ElementRef;

  displayedColumns: string[] = ['Region','INRInvAmt', 'Collected', 'INROSAmt','TDS','Retention','NoDue','ReceiptAmount','Days1to30','Days31to60','Days61to90','Days91to180','Days181to365','Days366to730','above730days','Provision'];
  displayedColumns1: string[] = ['Region','postingdate','salesoffice','CustomerCode','docno','YilSono','pono','InvoiceNo','outstandingamount','invoicedate','docinvoiceamount','invoiceCurrancy','INRInvAmt', 'Collected','tdsamount','Retention','notdue','Above90','Narration'];
  displayedColumns2: string[] = ['Region','postingdate','salesoffice','CustomerCode','docno','YilSono','pono','InvoiceNo','outstandingamount','invoicedate','docinvoiceamount','invoiceCurrancy','INRInvAmt', 'Collected','tdsamount','Retention','notdue','above365','Narration'];
  displayedColumns3: string[] = ['Projectmanager','DocOutstandingAmount','DocOSCurrency','InvoiceNo','outstandingamount','invoicedate','docinvoiceamount','invoiceCurrancy','INRInvAmt', 'Collected','tdsamount','Retention','notdue','Days1to30','Days31to60','Days61to90','Days91to180','Days181to365','Days366to730','above730days','Above90days','Above365Days'];
  displayedColumns4: string[] = ['wbselement','ProjectManager','CustomerName','CustomerCode','Above90days'];
  displayedColumns5: string[] = ['wbselement','ProjectManager','CustomerName','CustomerCode','Above90days'];
  displayedColumns6: string[] = ['wbselement','CustomerCode','docno','YilSono','pono','Projectmanager','InvoiceNo','outstandingamount','invoicedate','docinvoiceamount','invoiceCurrancy','INRInvAmt', 'Collected','tdsamount','Retention','notdue','Days1to30','Days31to60','Days61to90','Days91to180','Days181to365','Days366to730','above730days','Above90days','Above365Days'];
 public summaryform:FormGroup;
 public documents:ReportDocuments;
 public getdocuments:any;
 public filevalue:string;
 public OSForm1:FormGroup;
 public osreport:osreport;
 public summaryreport:summaryreportmodel;
 public divsionlist:any;
 public regionlist:any;
 public pmlist:any;
 public customerlist:any;
 public typeofChart: string;
 public alldivision:OsReportAllDivisionDataModel;
 public osreportdata:any;
 public pcidivison:boolean;
 public cecidivison:boolean;
 //public osdate:Date;
 public regionwise:boolean=false;
 public greaterthan90:boolean=false;
 public greaterthan365:boolean=false;
 public pmwise:boolean=false;
 public jobwise:boolean=false;
 public jobwisegreaterthan90:boolean=false;
 public jobwisegreaterthan365:boolean=false;

 public osdate: DateModel;
 public chartdata:any;
 public Year:number;
 public Month:number;
 public highchart=Highcharts;
 public summarysubmitted:boolean=false;
 public chartLables: Array<any> = [];
 //dataSource =this.get

  startDate = new Date(2020, 0, 1);
  ngOnInit() {
    //this.highchart=this.highcharts;
    this.documents=new ReportDocuments();
    this.getdocuments=new Array<any>();
    this.osreport=new osreport();
    this.divsionlist=new Array<any>();
    this.regionlist=new Array<any>();
    this.pmlist=new Array<any>();
    this.osdate=new DateModel();
    this.pcidivison=false;
    this.cecidivison=false;
    this.summaryreport=new summaryreportmodel();
    this.alldivision=new OsReportAllDivisionDataModel();
    this.LoadAlldivisions();
    this.LoadAllregions();
    this.LoadAllprojectmanagers();
    this.chartdata=new Array<any>();
    this.osreportdata=new Array<any>();
    this.financeservice.getosdate().subscribe(data=>{
          this.osdate=data;
          this.summaryreport.Year=this.osdate.Year;
          this.summaryreport.Month=this.osdate.Month;
         
          // this.financeservice.GetDivisonschart(this.osdate).subscribe(data=>{
          //   this.chartdata=data;
          // })
          
    })
    //this.loadChart();
    this.typeofChart = "bar";
    //this.getdivisionchart(this.osdate);
    // this.Year=this.osdate.Year;
    // this.Month=this.osdate.Month;
    this.summaryform=this.formbuilder.group({
      Division:new FormControl('', [Validators.required]),
      RegionS:new FormControl(''),
      ProjectManager:new FormControl(''),
      Year:new FormControl(''),
      Month:new FormControl(''),
      regionwise:new FormControl(''),
      greaterthan365:new FormControl(''),
      greaterthan90:new FormControl(''),
      pmwiser:new FormControl(''),
      jobwise:new FormControl(''),
      jobwisegreaterthan90:new FormControl(''),
      jobwisegreaterthan365:new FormControl(''),

      
    })
    
    this.summaryform.controls['RegionS'].clearValidators();
    this.summaryform.controls['ProjectManager'].clearValidators();
    this.summaryform.controls['Year'].clearValidators();
    this.summaryform.controls['Month'].clearValidators();
    this.summaryform.controls['regionwise'].clearValidators();
    this.summaryform.controls['greaterthan365'].clearValidators();
    this.summaryform.controls['greaterthan90'].clearValidators();
    this.summaryform.controls['pmwiser'].clearValidators();
    this.summaryform.controls['jobwise'].clearValidators();
    this.summaryform.controls['jobwisegreaterthan90'].clearValidators();
    this.summaryform.controls['jobwisegreaterthan365'].clearValidators();
    
  }

  



  ngAfterViewInit() {
    this.osreportdata.paginator = this.paginator;
  }
  Divisions = new FormControl();
  toppingList: string[] = ['CECI', 'PCI', 'SERVICE', 'SOLUTIONS', 'SYSTEMS', 'TAS','TMI'];
  applyFilter(filtervalue:string) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.getdocuments.filter = filtervalue.trim().toLowerCase();
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
LoadAllprojectmanagers(){
  this.alldivision.Employeeno=190455;
  this.alldivision.Flag=1
  this.financeservice.getallpm(this.alldivision).subscribe(data=>{
    this.pmlist=data;
  })
}

Loadreports(osreport:osreport){
  // this.financeservice.LoadOSReport(osreport).subscribe(data=>{
  //    this.osreportdata=data;
  //    this.osreportdata=new MatTableDataSource(this.osreportdata);
  //    this.osreportdata.paginator = this.paginator;
  // })
}
Loaddivisionbyreport(report:summaryreportmodel){
  if(report.Regionwise==true){
    this.regionwise=true;
    this.financeservice.GenerateReportBuSummary(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }

  if(report.greaterthan90==true){
    this.greaterthan90=true;
    this.financeservice.Getsummaryreportabove90(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  if(report.greaterthan365==true){
    this.greaterthan365=true;
    this.financeservice.Getsummaryreportabove365(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  if(report.pmwise==true){
    this.pmwise=true;
    this.financeservice.GenerateReportPMSummary(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  if(report.jobwise==true){
    this.jobwise=true;
    this.financeservice.GenerateReportJobWiseSummary(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  if(report.jobwisegreaterthan90==true){
    this.jobwisegreaterthan90=true;
    this.financeservice.GenerateReportJobSummaryAbove90(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  if(report.jobwisegreaterthan365==true){
    this.jobwisegreaterthan365=true;
    this.financeservice.GenerateReportJobSummaryAbove365(report).subscribe(data=>{
      this.osreportdata=data;
      this.osreportdata=new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
   })
  }
  // this.summarysubmitted=true;
  // if(this.summaryform.invalid){
  //   return;
  // }
  // else{
  //   this.financeservice.GenerateReportBuSummary(report).subscribe(data=>{
  //     this.osreportdata=data;
  //     this.osreportdata=new MatTableDataSource(this.osreportdata);
  //     this.osreportdata.paginator = this.paginator;
  //  })
  // }
}
getchartdata1(chart:DateModel){
  this.financeservice.GetDivisonschart(chart).subscribe(data=>{
    this.chartdata=data;
  })
};
exportTable() {
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
}

getdivisionchart(osdate:DateModel){
  this.financeservice.GetDivisonschart(osdate).subscribe(data=>{
    this.chartdata=data;

  })
}
divisonselected(event,division:any){
  var divisonvalue=event.source.value;
  if(division == 'PCI' || division == 'TAS' || division == 'TMI' || division == 'Service'){
    this.pcidivison=true;
    this.cecidivison=false;
    //event.source.value='';
  }
  else if(division == 'CECI' || division == 'Solution' || division == 'Systems')
  {
     this.cecidivison=true;
     this.pcidivison=false;
     //event.source.value='';
  }

}

selectyear(e){
  this.summaryreport.Year=e.target.value;
}
selectmonth(e){
  this.summaryreport.Month=e.target.value;
}

}
