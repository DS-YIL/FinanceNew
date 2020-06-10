import { Component, ViewChild, HostListener } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { constant } from '../_helper/constant';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
 
@Component({
 selector: "app-nav",
 templateUrl: "./nav.component.html",
 styleUrls: ["./nav.component.css"]
})
export class NavComponent {
 opened = true;
 appitems: MultilevelNodes[] = constant.sidebarDemoLinks;
 config = constant.sidebarConfigurations;
 displayList = false;
 url = environment.apiUrl;
 constructor(
 private router: Router,
 private http: HttpClient,
 private activatedRoute: ActivatedRoute
 ) { }
 
 @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
 ngOnInit() {
 if (window.innerWidth < 768) {
 this.sidenav.fixedTopGap = 55;
 return this.opened = false;
 } else {
 this.sidenav.fixedTopGap = 55;
 return this.opened = true;
 } 
 }
 @HostListener("window:resize", ["$event"])
 onResize(event) {
 if (event.target.innerWidth < 768) {
 this.sidenav.fixedTopGap = 55;
 return this.opened = false;
 } else {
 this.sidenav.fixedTopGap = 55;
 return this.opened = true;
 }
 return this.opened = false;
 }
 isBiggerScreen() {
 const width =
 window.innerWidth ||
 document.documentElement.clientWidth ||
 document.body.clientWidth;
 
 if (width < 768) {
 return true;
 } else {
 return false;
 }
 return this.opened = false;
 }
 toggleSidenav() {
 return this.sidenav.toggle();
 }
 
 logout() {
 // console.log(sessionStorage.getItem("accessToken"));
 // let headers = new HttpHeaders();
 // headers = headers.set(
 // "Authorization",
 // "Bearer " + sessionStorage.getItem("accessToken")
 // );
 sessionStorage.removeItem("accessToken");
 sessionStorage.removeItem("role");
 this.router.navigateByUrl("/login");
 }
}