import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { financeService } from 'src/app/FinanceService/Financeservices'
import { DynamicSearchResult, ReportDocuments, osreport, OsReportAllDivisionDataModel, DateModel } from 'src/app/Models/FinanceModels'
import { MatTableDataSource } from '@angular/material'
import { MatDialog, MatTable, MatPaginator } from '@angular/material'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { stringify } from 'querystring';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-MCReport',
  templateUrl: './MCReport.component.html',
  styleUrls: ['./styleforMcReport.css']

})

export class MCReportComponent implements OnInit {
  public mcdata: any;
  rowGroupMetadata: any;
  public labels = [];
  constructor(private financeservice: financeService, private formBuilder: FormBuilder,public dialog:MatDialog) { };
 
  ngOnInit() {
    var testingdata = [];
    this.financeservice.GenerateMCReport().subscribe(data => {
      console.log("data", data)
      this.labels = data;
      console.log("newchart", this.labels)
      this.changeStructure(data);

    })
    // this.changeStructure(this.data);
    // this.chartForTable([100]);
  }
  onSort() {
    this.updateRowGroupMetaData();
  }

  changeStructure(data) {
    var dictData = {};
    for (var i = 0; i < data.length; i++) {
      var listData = [];
      for (var x = 0; x < data.length; x++) {
        if (data[i].Division == data[x].Division) {
          let difrence = []
          listData.push(data[x])
        }
      }
      dictData[data[i].Division] = listData;
    }
    for (let [key, value] of Object.entries(dictData)) {
      let differenceDict = {}
      differenceDict['OSAMt'] = value[1]['OSAMt'] - value[0]['OSAMt']
      differenceDict['Provision'] = value[1]['Provision'] - value[0]['Provision']
      differenceDict['above730days'] = value[1]['above730days'] - value[0]['above730days']
      differenceDict['collectable'] = value[1]['collectable'] - value[0]['collectable']
      differenceDict['days1to30'] = value[1]['days1to30'] - value[0]['days1to30']
      differenceDict['days31to60'] = value[1]['days31to60'] - value[0]['days31to60']
      differenceDict['days61to90'] = value[1]['days61to90'] - value[0]['days61to90']
      differenceDict['days91to180'] = value[1]['days91to180'] - value[0]['days91to180']
      differenceDict['days181to365'] = value[1]['days181to365'] - value[0]['days181to365']
      differenceDict['days366to730'] = value[1]['days366to730'] - value[0]['days366to730']
      differenceDict['retention'] = value[1]['retention'] - value[0]['retention']
      differenceDict['notDue'] = value[1]['notDue'] - value[0]['notDue']
      differenceDict['Division'] = value[1]['Division']
      value[2] = differenceDict
    }
    this.mcdata = dictData;
    return this.mcdata;
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.mcdata) {
      for (let i = 0; i < this.mcdata.length; i++) {
        let rowData = this.mcdata[i];
        let Division = rowData.Division;
        if (i == 0) {
          this.rowGroupMetadata[Division] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.mcdata[i - 1];
          let previousRowGroup = previousRowData.Division;
          if (Division === previousRowGroup)
            this.rowGroupMetadata[Division].size++;
          else
            this.rowGroupMetadata[Division] = { index: i, size: 1 };
        }
      }
    }
  }

  openDialog(division): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        minWidth: "1000px",
        data: this.mcdata[division]
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
      });
    }
}