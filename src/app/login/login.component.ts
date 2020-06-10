import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { customToaster } from "../_helper/toaster";
import {Logins} from 'src/app/Models/FinanceModels'
import * as jwt_decode from 'jwt-decode';
import { financeService } from 'src/app/FinanceService/Financeservices'
import { first } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  url = environment.apiUrl;
  public loginMessage = "";
  public resultmodel:any;
  usermodel = new Logins();
  loading = false;
  hide = true;
  
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private financeservice: financeService
  ) {}
  ngOnInit() {
    this.toastr.clear();

    // if (isNullOrUndefined(sessionStorage.getItem("accessToken"))) {
    //   this.router.navigateByUrl("/login");
    // } else {
    //   this.router.navigateByUrl("/home/dashboard");
    // }
  }
  loginuser() {
    this.loading = true;
    this.usermodel.values=this.usermodel.username +","+ this.usermodel.password;
    var data = this.usermodel;
    this.financeservice.ValidateLoginCredentials(data).pipe(first()).subscribe(data=>{
      if(data.EmployeeNo!=null){
        this.resultmodel=data;
        this.router.navigateByUrl('/home/uploadfile')
      }else{
        this.router.navigateByUrl("/login");
        this.loginMessage = "Invalid Credentials";
      }
         
    })
    // this.http.post(this.url + "user/login/", data).subscribe(
    //   (res: any) => {
    //     sessionStorage.setItem("accessToken", res.access);
    //     var decoded = jwt_decode(res.access); 
    //     sessionStorage.setItem("role", decoded.role);
    //     this.router.navigateByUrl("/home/dashboard");
    //     this.loginMessage = "";
    //   },
    //   error => {
    //     sessionStorage.removeItem("accessToken");
    //     this.router.navigateByUrl("/login");
    //     this.loginMessage = "Invalid Credentials";
    //     this.loading = false;
    //   }
    // );
  }
}
