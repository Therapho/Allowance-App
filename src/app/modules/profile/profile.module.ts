import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProfileViewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
