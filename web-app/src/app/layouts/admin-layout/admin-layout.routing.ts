import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { MapsComponent } from '../../maps/maps.component';
import { AdminComponent } from '../../admin/admin.component';
import { AssetComponent } from '../../assets/asset/asset.component';
import { AssetDetailComponent } from '../../assets/asset-detail/asset-detail.component';
import { AssetLocationComponent } from '../../assets/asset-location/asset-location.component';
import { AssetMapComponent } from '../../assets/asset-map/asset-map.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '',               component: DashboardComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'asset-list',     component: AssetDetailComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'create-asset',   component: AssetComponent },
    { path: 'asset-location',   component: AssetLocationComponent },
    { path: 'asset-map',   component: AssetMapComponent },
    { path: 'admin',          component: AdminComponent},
];
