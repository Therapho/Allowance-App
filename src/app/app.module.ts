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
        authority: environment.authority, // 'https://login.microsoftonline.com/common',
        cacheLocation: environment.cacheLocation,
        redirectUri: environment.appPath,
        consentScopes: environment.contentScopes,
        protectedResourceMap: [
          [
            'https://allowance-functions.azurewebsites.net/api/',
            ['api://1663b9c6-436f-49e9-84b1-684638c20921/User.Read']
          ],
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ]
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
    AccountStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
