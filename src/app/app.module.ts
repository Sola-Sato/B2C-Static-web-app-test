import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppConst } from "./model/AppConst";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: AppConst.CLIENT_ID,
        authority: AppConst.MSAL_AUTHORITY,
        redirectUri: AppConst.MSAL_LOGIN_REDIRECT_URI,
        postLogoutRedirectUri: AppConst.MSAL_LOGOUT_REDIRECT_URI,
        knownAuthorities: AppConst.MSAL_KNOWN_AUTHORITIES
      },
      cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false,
      }
    }), {
      interactionType: InteractionType.Redirect,  // MSAL Guard Configuration
      authRequest: {
        scopes: ["openid", "offline_access"]
      }
    }, {
      interactionType: InteractionType.Redirect,  // MSAL Interceptor Configuration
      protectedResourceMap: AppConst.MSAL_PROTECTED_RESOURCE_MAP
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
