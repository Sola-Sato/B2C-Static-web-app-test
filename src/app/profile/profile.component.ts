import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { catchError } from 'rxjs';
import { AppConst } from '../model/AppConst';

//import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profile!: string;
  accountInfoJson!: string;
  accessToken!: string;
  idToken!: string;
  responseGet?: string;
  responsePost?: string;

  @ViewChild('requestScope') requestScope: ElementRef;
  @ViewChild('apiUrlGet') apiUrlGet: ElementRef;
  @ViewChild('apiUrlPost') apiUrlPost: ElementRef;
  @ViewChild('postJson') postJson: ElementRef;

  constructor(
    private http: HttpClient,
    private authService: MsalService
  ) { }

  ngOnInit() {
    //this.getProfile();
    //this.getAllAcount();
  }

  ngAfterViewInit() {
    this.requestScope.nativeElement.value = AppConst.API_SCOPE;
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = JSON.stringify(profile);
      });
  }

  getAllAcount() {
    var allAcount = this.authService.instance.getAllAccounts();

    allAcount.forEach((account) => {
      if (account.tenantId != undefined && account.tenantId != null
          && account.username != undefined && account.username != null) {
            this.accountInfoJson = JSON.stringify(account);
            return;
      }
    });
  }

  getToken() {
    var scope = this.requestScope.nativeElement.value;
    if (scope) {
      let tokenRequest = {
        scopes: []
      };
      tokenRequest.scopes.push(scope);
      this.authService.handleRedirectObservable();
      this.authService.acquireTokenSilent(tokenRequest)
        .subscribe({
          next: (res) => {
            this.accessToken = res.accessToken;
            this.idToken = res.idToken;
            console.log("accessToken: " + this.accessToken);
            console.log("idToken: " + this.idToken);
          },
          error: (e) => {
            this.authService.acquireTokenRedirect(tokenRequest);
          }
        });
    }
  }

  callGetApi() {
    var url = this.apiUrlGet.nativeElement.value;

    this.http.get(url)
      .subscribe((response) => {
        this.responseGet = JSON.stringify(response);
        console.log(this.responseGet);
      });
  }

  callPostApi() {
    var url = this.apiUrlPost.nativeElement.value;
    var json = this.postJson.nativeElement.value;
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url,
        json,
        {headers: headers, responseType: "text"})
      .subscribe((response) => {
        this.responsePost = String(response);
        console.log(this.responsePost);
      });
  }
}
