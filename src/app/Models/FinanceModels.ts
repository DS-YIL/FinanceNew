import { NumberValueAccessor } from '@angular/forms';
import { Data } from '@angular/router';

export class DynamicSearchResult {
    connectionString: string;
    columnNames: string;
    columnValues: string;
    tableName: string;
    updateCondition: string;
    searchCondition: string;
    query: string;
    sortBy: string;
    LoginID:string;
    Password:string;
  }
  export class Logins {
    username: string;
    password: string;
    values:string;
  }
  
export class summaryreportmodel
{
    Month:number;
    Year:number;
    ProjectManager:string;
    Region:string;
    Division:string;
    Employeeno:string;
    Regionwise:boolean;
    greaterthan90:boolean;
    greaterthan365:boolean;
    pmwise:boolean;
    jobwise:boolean;
    jobwisegreaterthan90:boolean;
    jobwisegreaterthan365:boolean;
}
export class ReportDocuments{
    DocId: number;
    DocumentName: string;
    UploadedBy: string;
    UploadedDate: Date
    Path: string;
    DocumentTypeid: number;
    Deleteflag: boolean
}
export class UserModel{
    EmpName:string;
    LoginID:string;
    Departmenty:string;
}
export class osreport{
    saleordernumber:string;
    documentnumber:string;
    invoicenumber:string;
    custpono:string;
    customercode:string;
    customername:Array<string>;
    region:Array<string>;
    division:Array<string>;
    projectmanager:Array<string>;
    projectid:string;
    reportmonth:Date;
    reporttype:string;
    agingcriteria:string;
    OsdDate:Date;
    Year:number;
    Month:number;

    //for single selection
    DivisionS:string;
    RegionS:string;
    InvoiceNo:string;
    ProjectManager:string;
    CustomerName:string;
}
export class OsBUReportDataModel{
    DivisionS:string;
    RegionS:string;
    txtDocNo:string;
    txtInvoiceNo:string;
    InvoiceNo:string;
    
}
export class OsReportAllDivisionDataModel{
    Employeeno:number;
    Flag:number;
}

export class DateModel{
    Month:number;
    Year:number;
}
export class dsoinputmodel{
    Division:string;
    Region:string;
    ReportDate:Date;
}