import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {DynamicSearchResult,dsoinputmodel,OsReportAllDivisionDataModel,osreport,DateModel,summaryreportmodel,Logins} from '../Models/FinanceModels'

@Injectable({
    providedIn: 'root'
  })

  export class financeService{
    public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer PPCRbsP3beI49XTuG6yKwr9RGL_Vv5-B5MEzBD6k3j6hc9VsCqfGvy14-aBIyXms0odjNS9eahOFhiv7jytiJyibh80MujGAbG44fbQTZb2SIZv2FETb-zrdL3Mw-pPRK3HjuWBZTh09soP68_EDqw91mH7-4uYgswWpTHGkJpHQcZ6NWp3J0nbdEaGDC17w6D-qWUiWIQHbWg1UXeAmwg' }) };
    constructor(private http: HttpClient) {
       
      }
      public url = "http://localhost:57381/";

      // ValidateLoginCredentials(search: DynamicSearchResult) {
      //   return this.http.post<any>(this.url + 'MPR/ValidateLoginCredentials/', search)
      //     .pipe(map(data => {
      //       if (data.EmployeeNo != null) {
      //         localStorage.setItem('Employee', JSON.stringify(data));
      //         //this.currentUserSubject.next(data);
      //       }
      //       return data;
      //     }))
      // }
      uploadfile(formdata:FormData){
        return this.http.post<any>(this.url + 'api/FileUploading/UploadFile/',formdata)
        .pipe(map(data => {
          return data;
        }))
      }
      uploadExcel(formdata: FormData): Observable<any> {
        return this.http.post<any>(this.url + 'api/FileUploading/UploadFile/', formdata)
          .pipe(map(data => {
            return data;
          }))
      }
      getuploadfiledocuments():Observable<any>{
          return this.http.get<any>(this.url + 'api/GetAllUploadHistory/',this.httpOptions);
      }
      getalldivisions(alldivisions:OsReportAllDivisionDataModel):Observable<any>{
          return this.http.post<any>(this.url +'api/GetDivision',alldivisions,this.httpOptions);
      }
      getallregions(alldivisions:OsReportAllDivisionDataModel):Observable<any>{
        return this.http.post<any>(this.url +'api/GetRegion',alldivisions,this.httpOptions);
    }
    getallpm(alldivisions:OsReportAllDivisionDataModel):Observable<any>{
        return this.http.post<any>(this.url +'api/GetPM',alldivisions,this.httpOptions);
    }
    getallcustomernames(alldivisions:OsReportAllDivisionDataModel):Observable<any>{
        return this.http.post<any>(this.url +'api/GetCustomerNameCode',alldivisions,this.httpOptions);
    }
    LoadOSReport(osreports:osreport):Observable<any[]>{
        return this.http.post<any[]>(this.url +'api/BUReport2',osreports,this.httpOptions);
    }
    getosdate():Observable<any>{
      return this.http.get<any>(this.url +'api/GetOSDate',this.httpOptions);
    }
    GetDivisonschart(date:DateModel):Observable<[]>{
      return this.http.post<[]>(this.url +'api/GetDivisonschart',date,this.httpOptions);
    }
    getdivisionreportbymonth(osreports:osreport):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/BUReportdivision',osreports,this.httpOptions);
    }
    GenerateReportBuSummary(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/GenerateReportBuSummary',summary,this.httpOptions);
    }
    Getsummaryreportabove90(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/Getsummaryreportabove90',summary,this.httpOptions);
    }
    Getsummaryreportabove365(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/Getsummaryreportabove365',summary,this.httpOptions);
    }
    GenerateReportPMSummary(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/GenerateReportPMSummary',summary,this.httpOptions);
    }
    GenerateReportJobWiseSummary(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/GenerateReportJobWiseSummary',summary,this.httpOptions);
    }
    GenerateReportJobSummaryAbove90(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/GenerateReportJobSummaryAbove90',summary,this.httpOptions);
    }
    GenerateReportJobSummaryAbove365(summary:summaryreportmodel):Observable<any[]>{
      return this.http.post<any[]>(this.url +'api/GenerateReportJobSummaryAbove365',summary,this.httpOptions);
    }
    GenerateMCReport():Observable<any[]>{
      return this.http.get<any[]>(this.url +'api/GetMCReport',this.httpOptions);
    }
    ValidateLoginCredentials(login:Logins):Observable<any>{
      return this.http.post<any>(this.url +'api/ValidatesigninCredentials',login,this.httpOptions);
    }
    GetDSOregionData(model:dsoinputmodel):Observable<any>{
      return this.http.post<any>(this.url +'api/GetDSOregionData',model,this.httpOptions)
    }
    GetDSOdivisionData(model:dsoinputmodel):Observable<any>{
      return this.http.post<any>(this.url +'api/GetDSOdivisionData',model,this.httpOptions)
    }
  }