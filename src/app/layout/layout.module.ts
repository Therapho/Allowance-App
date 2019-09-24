import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Navigation } from 'selenium-webdriver';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [ NavigationComponent, HomeComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class LayoutModule { }
