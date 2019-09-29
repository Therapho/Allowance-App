import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { BusyService } from './core/services/busy-service/busy.service';
import { HttpInterceptorService } from './core/services/http-interceptor-service/http-interceptor.service';
import { MessageService } from './core/services/message-service/message.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './views/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HomeComponent, MessageComponent, MessageDialogComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [MessageDialogComponent],
  providers: [

    UserStore,
    AccountStore,
    BusyService,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
