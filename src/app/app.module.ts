import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpClientModule
} from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { environment } from 'src/environments/environment';
import { BusyService } from './core/services/busy-service/busy.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    [
      MsalModule.forRoot({
        clientID: environment.clientId,
        authority: environment.authority,
        cacheLocation: environment.cacheLocation,
        redirectUri: environment.appPath,
        consentScopes: environment.contentScopes,
        validateAuthority: environment.validateAthority,
        protectedResourceMap: environment.protectedResourceMap as [string, string[]][]
      })
    ]
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    UserStore,
    AccountStore,
    BusyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
