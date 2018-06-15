import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notifications/notification.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/create-asset', title: 'Create Asset',  icon:'create', class: '' },
    { path: '/asset-list', title: 'Manage Assets',  icon:'content_paste', class: '' },
    { path: '/asset-location', title: 'View Assets Location',  icon:'location_on', class: '' },
    { path: '/admin', title: 'Admin', icon:'personal', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
