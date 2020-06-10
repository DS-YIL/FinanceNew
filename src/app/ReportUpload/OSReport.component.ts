import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { financeService } from 'src/app/FinanceService/Financeservices'
import { DynamicSearchResult, ReportDocuments, osreport, OsReportAllDivisionDataModel, DateModel } from 'src/app/Models/FinanceModels'
import { MatTableDataSource } from '@angular/material'
import { MatDialog, MatTable, MatPaginator } from '@angular/material'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import bar from 'highcharts/modules/funnel';
import { TableUtil } from "./TableUtil";
import * as XLSX from "xlsx";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
// import Highcharts from 'highcharts';

interface ReportType {
  value: string;
  viewValue: string;
}
interface datetype {
  value: number;
}
Exporting(Highcharts);
bar(Highcharts);
@Component({
  selector: 'app-OSReport',
  templateUrl: './OSReport.component.html',
})
export class OSReportComponent implements OnInit {

  date = new FormControl(new Date());
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("container", { read: ElementRef, static: true }) container: ElementRef;

  displayedColumns: string[] = ['Division', 'INRInvAmt', 'Collected', 'INROSAmt', 'TDS', 'Retention', 'NoDue', 'Days1to30', 'Days31to60', 'Days61to90', 'Days91to180', 'Days181to365', 'Days366to730', 'above730days'];
  displayedColumns1: string[] = ['Region', 'Division', 'postingdate', 'salesoffice', 'CustomerCode', 'docno', 'YilSono', 'pono', 'wbselement', 'Projectmanager', 'InvoiceNo', 'outstandingamount', 'invoicedate', 'docinvoiceamount', 'invoiceCurrancy', 'INRInvAmt', 'Collected', 'tdsamount', 'Retention', 'notdue', 'Days1to30', 'Days31to60', 'Days61to90', 'Days91to180', 'Days181to365', 'Days366to730', 'above730days'];


  public documents: ReportDocuments;
  public getdocuments: any;
  public filevalue: string;
  public OSForm1: FormGroup;
  public osreport: osreport;
  public divsionlist: any;
  public regionlist: any;
  public pmlist: any;
  public customerlist: any;
  public typeofChart: string;
  public alldivision: OsReportAllDivisionDataModel;
  public osreportdata: any;
  //public osdate:Date;
  public osdate: DateModel;
  chartdata: any[] = [];
  public Year: number;
  public Month: number;
  public highchart = Highcharts;
  public chartLables: Array<any> = [];
  //dataSource =this.get
  constructor(private financeservice: financeService, private formBuilder: FormBuilder) {
    this.osreportdata = new MatTableDataSource(this.osreportdata)

  }
  startDate = new Date(2020, 0, 1);
  ngOnInit() {
    //this.highchart=this.highcharts;
    this.documents = new ReportDocuments();
    this.getdocuments = new Array<any>();
    this.osreport = new osreport();
    this.divsionlist = new Array<any>();
    this.regionlist = new Array<any>();
    this.pmlist = new Array<any>();
    this.customerlist = new Array<any>();
    this.osdate = new DateModel();
    this.alldivision = new OsReportAllDivisionDataModel();
    this.LoadAlldivisions();
    this.LoadAllregions();
    this.LoadAllprojectmanagers();
    this.LoadAllcustomers();
    // this.chartdata=new Array<any>();
    this.osreportdata = new Array<any>();
    this.financeservice.getosdate().subscribe(data => {
      this.osdate = data;
      this.osreport.Year = this.osdate.Year;
      this.osreport.Month = this.osdate.Month;
      //this.getdivisionchart(this.osdate);
      this.financeservice.GetDivisonschart(this.osdate).subscribe(data => {
        this.chartdata = [[data][0]];
        for (var i = 0; i < data.length; i++) {
          // this.chartdata.push([data][i])
          console.log('hiii', [data][0]);
        }
        var names =  ['CECI', 'PCI', 'PCIANA', 'SERVICE', 'SOLUTION', 'SYSTEMS', 'TAS', 'TMI']
        this.testChart([data], names);

        // console.log('yyyyyyyy',this.chartdata);

      })
      //date = new FormControl(this.osdate.toISOString);
    })
    //this.loadChart();
    this.typeofChart = "bar";
    //this.getdivisionchart(this.osdate);
    // this.Year=this.osdate.Year;
    // this.Month=this.osdate.Month;
  }

  // Chart(data) {
  //   var bar_chart = new Chart("barChart", {
  //       type: "bar",
  //     title: {
  //       text: "Monthly Average Collections"
  //     },
  //     legend: {
  //       layout: 'vertical',
  //       align: 'left',
  //       verticalAlign: 'top',
  //       x: 350,
  //       y: 100,
  //       floating: true,
  //       borderWidth: 1,
  //     },
  //     xAxis: {
  //       categories: ['CECI', 'PCI', 'PCI ANA', 'SERVICE', 'SOLUTION', 'SYSTEMS', 'TAS', 'TMI'], title: {
  //         text: null
  //       }
  //     },

  //     yAxis: {
  //       min: 0, title: {
  //         text: 'Collection (millions)', align: 'high'
  //       },
  //       labels: {
  //         overflow: 'justify'
  //       }
  //     },
  //     plotOptions: {
  //       bar: {
  //         dataLabels: {
  //           enabled: true
  //         },
  //         enableMouseTracking: false
  //       }
  //     },
  //     tooltip: {
  //       valueSuffix: " °C"
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [
  //       {
  //         name: 'Total collections',
  //         data: [774984949,7474874984949]
  //       }
  //     ]
  //   })
  // }

  reports: ReportType[] = [
    { value: 'All Outstanding', viewValue: 'All Outstanding' },
    { value: 'Top 5', viewValue: 'Top 5' },
    { value: 'Top 10', viewValue: 'Top 10' }
  ];




  ngAfterViewInit() {
    this.osreportdata.paginator = this.paginator;
  }
  Divisions = new FormControl();
  toppingList: string[] = ['CECI', 'PCI', 'SERVICE', 'SOLUTIONS', 'SYSTEMS', 'TAS', 'TMI'];
  applyFilter(filtervalue: string) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.getdocuments.filter = filtervalue.trim().toLowerCase();
  }
  LoadAlldivisions() {
    this.alldivision.Employeeno = 190455;
    this.alldivision.Flag = 1
    this.financeservice.getalldivisions(this.alldivision).subscribe(data => {
      this.divsionlist = data;
    })
  }
  LoadAllregions() {
    this.alldivision.Employeeno = 190455;
    this.alldivision.Flag = 1
    this.financeservice.getallregions(this.alldivision).subscribe(data => {
      this.regionlist = data;
    })
  }
  LoadAllprojectmanagers() {
    this.alldivision.Employeeno = 190455;
    this.alldivision.Flag = 1
    this.financeservice.getallpm(this.alldivision).subscribe(data => {
      this.pmlist = data;
    })
  }
  LoadAllcustomers() {
    this.alldivision.Employeeno = 190455;
    this.alldivision.Flag = 1
    this.financeservice.getallcustomernames(this.alldivision).subscribe(data => {
      this.customerlist = data;
    })
  }
  Loadreports(osreport: osreport) {
    this.financeservice.LoadOSReport(osreport).subscribe(data=>{
       this.osreportdata=data;
       this.osreportdata=new MatTableDataSource(this.osreportdata);
       this.osreportdata.paginator = this.paginator;
    })
  }
  Loaddivisionbyreport(osreport: osreport) {
    this.financeservice.getdivisionreportbymonth(osreport).subscribe(data => {
      this.osreportdata = data;
      this.osreportdata = new MatTableDataSource(this.osreportdata);
      this.osreportdata.paginator = this.paginator;
    })
  }
  getchartdata1(chart: DateModel) {
    this.financeservice.GetDivisonschart(chart).subscribe(data => {
      this.chartdata = data;
    })
  };
  exportTable() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
  // typeChange() {
  //   this.loadChart();
  // }

  // loadChart() {


  //     chartOptions={
  //       chart:{
  //         type:'bar'
  //       },
  //      title: {
  //        text: 'MPR Status'
  //      },

  //      plotOptions: {
  //        series: {
  //          dataLabels: {
  //            enabled: true,
  //            format: '<b>{point.name}</b> ({point.y:,.0f})',
  //            softConnector: true
  //          },
  //          center: ['40%', '50%'],
  //          neckWidth: '30%',
  //          neckHeight: '25%',
  //          width: '70%'
  //        }
  //      },
  //      legend: {
  //        enabled: true
  //      },
  //      series: [{
  //        name: 'No.Of MPRs',
  //        data: this.chartdata
  //      }]


  //     }

  // }
  getdivisionchart(osdate: DateModel) {
    this.financeservice.GetDivisonschart(osdate).subscribe(data => {
      this.chartdata = data;

    })
  }
  selectyear(e) {
    this.osreport.Year = e.target.value;
  }
  selectmonth(e) {
    this.osreport.Month = e.target.value;
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['CECI', 'PCI', 'PCIANA', 'SERVICE', 'SOLUTION', 'SYSTEMS', 'TAS', 'TMI'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [this.chartdata], label: 'Monthly Collection' }
  ];

  testChart(serveData, names){
      var bar_chart = new Chart("CpaStockBarChart", {
          type: "bar",
          data: {
              // labels: ['CECI', 'PCI', 'PCIANA', 'SERVICE', 'SOLUTION', 'SYSTEMS', 'TAS', 'TMI'],
              labels: names,
              datasets: [
                  {
                      // label: "1",
                      data: serveData[0],
                      backgroundColor: "#ffd800",
                      hoverBorderWidth: 1,
                      hoverBorderColor: "lightgrey",
                      barThickness:50
                     
                  },
                  {
                    // label: "2",
                    data: serveData[1],
                    backgroundColor: "red",
                    hoverBorderWidth: 1,
                    hoverBorderColor: "lightgrey"
                }
            //     {
            //       label: "3",
            //       data: serveData[3],
            //       backgroundColor: "green",
            //       hoverBorderWidth: 3,
            //       hoverBorderColor: "lightgrey"
            //   },
            //   {
            //     label: "4",
            //     data: serveData[2],
            //     backgroundColor: "#ffd800",
            //     hoverBorderWidth: 3,
            //     hoverBorderColor: "lightgrey"
            // }
              ]
          },
          
          options: {
              responsive: true,
              animation: {
                  duration: 10
              },
              scales: {
                   xAxes: [
                      {
                          stacked: true,
                         ticks: {
                             fontColor: "black",
                               fontSize: 12,
                              //  stepSize: 500,
                               beginAtZero: true
                           }
                       }
                   ],
                  yAxes: [
                      {
                          stacked: true,
                          ticks: {
                              fontColor: "black",
                              fontSize: 12,
                              // stepSize: 500,
                              beginAtZero: true
                          }
                      }
                  ]
               },
              legend: { display: false },
              title: {
                  display: true,
                  text: 'Monthly Collections',
                  fontSize: 16,
              }
          }
      });
  }
}



