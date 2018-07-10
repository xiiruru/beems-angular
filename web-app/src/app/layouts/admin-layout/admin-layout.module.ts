import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgmCoreModule } from '@agm/core';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';
import { AdminComponent } from '../../admin/admin.component';
import { AssetComponent } from '../../assets/asset/asset.component';
import { AssetDetailComponent } from '../../assets/asset-detail/asset-detail.component';
import { AssetLocationComponent } from '../../assets/asset-location/asset-location.component';
import { AssetMapComponent } from '../../assets/asset-map/asset-map.component';

//Service
import { AssetService } from '../../assets/shared/asset.service';
//import { NotificationService } from '../../notifications/notification.service';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYZ8CgH5a3oRDujw80iR-VRD08x3c3xGI'
    }),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    AdminComponent,
    AssetComponent,
    AssetDetailComponent,
    AssetLocationComponent,
    AssetMapComponent
  ],
   providers: [AssetService]
})

export class AdminLayoutModule {}
