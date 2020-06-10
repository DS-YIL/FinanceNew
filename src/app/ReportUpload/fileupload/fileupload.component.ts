import { Component, OnInit,ViewChild } from '@angular/core';
import {financeService} from 'src/app/FinanceService/Financeservices'
import {DynamicSearchResult,ReportDocuments} from 'src/app/Models/FinanceModels'
import {MatTableDataSource} from '@angular/material'
import{MatDialog,MatTable} from '@angular/material'
import{DialogboxComponent} from 'src/app/Dialogpopup/dialogbox/dialogbox.component'

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  displayedColumns: string[] = ['FileNo','Uploaded_By', 'FileName', 'System_Date','action'];
 public documents:ReportDocuments;
 public getdocuments:any;
 public filevalue:string;
 //dataSource =this.getdocuments;
 @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(private financeservice:financeService,public dialog:MatDialog) { }

  ngOnInit() {
    this.documents=new ReportDocuments();
    this.getdocuments=new Array<any>();
    
    this.financeservice.getuploadfiledocuments().subscribe(data=>{
      this.getdocuments=data;
      this.getdocuments=new MatTableDataSource(this.getdocuments);
    })
  }

  fileChange(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      var filetype =this.documents.DocumentName;
      formData.append(filetype, file, file.name);
      //this.spinner.show();
      this.financeservice.uploadfile(formData).subscribe(data => {
        //this.spinner.hide();
        (<HTMLInputElement>document.getElementById("uploadInputFile")).value = "";
        this.documents = new ReportDocuments();
        this.documents.Path = data;
        this.documents.DocumentName = file.name;
        // if (formName == "supportingDocument") {
        //   this.mprDocuments.ItemDetailsId = null;
        //   this.mprDocuments.DocumentTypeid = 2;
        //   //this.MPR3Documents.push(this.mprDocuments);
        // }
        // else {
        //   this.mprDocuments.DocumentTypeid = 1;
        //   this.mprDocuments.ItemDetailsId = this.itemDetails.Itemdetailsid;
        // }
        //this.mprRevisionModel.MPRDocuments.push(this.mprDocuments);
      });
    }
  }
  uploadExcel(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      var filetype =this.documents.DocumentName;
      formData.append(filetype, file, file.name);
      //this.spinner.show();
      this.financeservice.uploadfile(formData).subscribe(data => {
        //this.spinner.hide();
        
          this.documents = new ReportDocuments();
          this.documents.Path = data;
          // this.mprDocuments.DocumentName = file.name;
          // this.mprDocuments.DocumentTypeid = 3;
          // this.mprDocuments.ItemDetailsId = null;
          // this.mprRevisionModel.MPRDocuments.push(this.mprDocuments);
          // this.MprService.updateMPR(this.mprRevisionModel).subscribe(data => {
          //   this.mprRevisionModel = data;
          //   this.displayItemDialog = false;
          // });
          // this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: 'file uploaded' });
        
      });
    }
  }
  applyFilter(filtervalue:string) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.getdocuments.filter = filtervalue.trim().toLowerCase();
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  deleteRowData(row_obj){
    this.getdocuments = this.getdocuments.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
