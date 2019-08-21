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
        clientID: '88bd734d-2378-4e04-a900-1bf83b88a43f',
        authority: 'https://login.microsoftonline.com/common',
        cacheLocation: 'localStorage',
        redirectUri: 'http://localhost:4200',
        consentScopes: [
          'user.read',
          'api://1663b9c6-436f-49e9-84b1-684638c20921/Child.Write',
          'api://1663b9c6-436f-49e9-84b1-684638c20921/Child.Read'
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
