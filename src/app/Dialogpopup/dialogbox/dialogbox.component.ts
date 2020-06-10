import { Component, OnInit ,Optional,Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material'

export interface getdocuments {
  FileNo: string;
  Uploaded_By:string;
  FileName:string;
  System_Date: Date;
}
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  action:string;
  local_data:any;
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: getdocuments) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
   }
   doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  ngOnInit() {
  }

}
