import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MsalModule, MsalInterceptor} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatCardModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    [MsalModule.forRoot({
      clientID: '88bd734d-2378-4e04-a900-1bf83b88a43f',
      authority: 'https://login.microsoftonline.com/common',
      cacheLocation : 'localStorage',
      redirectUri: 'http://localhost:4200',
      consentScopes: ['user.read']}),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })]

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
