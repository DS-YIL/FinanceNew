import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as Chart from 'chart.js';

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"]
})
export class ConfirmDialogComponent implements OnInit {

  chartData: any;
  constructor(private elementRef: ElementRef,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    this.chartData = data;
  }

  ngOnInit() {
    this.chartForTable(this.chartData);
  }

  chartForTable(chartData) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    var chart1 = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ["osAmt", "Provision", "above730days", "collectable", "days1to30", "days31to60", "days61to90", "days91to180", "days181to365", "days366to730", "retention", "notDue"],
        datasets: [
          {
            label: "Previous month",
            backgroundColor: "#8e5ea2",
            data: [chartData[0].OSAMt, chartData[0].above730days, chartData[0].collectable, chartData[0].days181to365,
            chartData[0].days181to365, chartData[0].days1to30, chartData[0].days31to60, chartData[0].days366to730,
            chartData[0].days61to90, chartData[0].days91to180, chartData[0].notDue, chartData[0].retention]
          },
          {
            label: "Current month",
            backgroundColor: "#3e95cd",
            data: [chartData[1].OSAMt, chartData[1].above730days, chartData[1].collectable, chartData[1].days181to365,
            chartData[1].days181to365, chartData[1].days1to30, chartData[1].days31to60, chartData[1].days366to730,
            chartData[1].days61to90, chartData[1].days91to180, chartData[1].notDue, chartData[1].retention]
          }
        ]
      },
      options: {
        legend: { display: true },
        responsive: true,
        title: {
          display: true,
          text: 'Monthly collection report'
        }
      }
    })
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
export class ConfirmDialogModel {
  constructor(public chartData: any) {
  }

}