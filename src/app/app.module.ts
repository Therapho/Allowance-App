import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
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
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { LoadingComponent } from './core/components/loading/loading.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });

    return mc;
  }
}

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
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: HAMMER_GESTURE_CONFIG,      useClass: MyHammerConfig  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
