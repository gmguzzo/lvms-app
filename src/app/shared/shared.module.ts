import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../material.module';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { SidebarSideComponent } from './components/sidebar-side/sidebar-side.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { EgretNotifications2Component } from './components/egret-notifications2/egret-notifications2.component';
import { HeaderSideComponent } from './components/header-side/header-side.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SearchInputOverComponent } from './components/search/search-input-over/search-input-over.component';
import { LayoutService } from './services/layout.service';
import { MatchMediaService } from './services/match-media.service';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { ThemeService } from './services/theme.service';
import { UILibIconService } from './services/ui-lib-icon.service';

const componentsShared = [
  AuthLayoutComponent,
  AdminLayoutComponent
];

const declarations = [
  SharedDirectivesModule,
  SharedMaterialModule,
  FormsModule, ReactiveFormsModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [
    SearchInputOverComponent,
    NotificationsComponent,
    FooterComponent,
    BreadcrumbComponent,
    HeaderSideComponent,
    EgretNotifications2Component,
    HeaderTopComponent,
    SidenavComponent,
    SidebarSideComponent,
    SidebarTopComponent,
    ...componentsShared
  ],
  imports: [
    ...declarations,
    PerfectScrollbarModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...componentsShared,
    ...declarations
  ],
  providers: [
    UILibIconService,
    LayoutService,
    MatchMediaService,
    NavigationService,
    RoutePartsService,
    ThemeService
  ]
})
export class SharedModule {
}
