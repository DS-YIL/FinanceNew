import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CustomErrorHandlerService } from "../_helper/errorHandler";
import { Router } from "@angular/router";
import { customToaster } from "../_helper/toaster";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  url = environment.apiUrl;
  p: number = 1;
  kanbanPg: number = 1;
  data;
  kanbanData;
  loading = true;
  loadingChart = true;

  constructor(
    private httpService: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

}
