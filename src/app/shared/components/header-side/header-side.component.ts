import { Component, Input, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { ITheme, ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { EgretNotifications2Component } from '../egret-notifications2/egret-notifications2.component';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {

  @Input() notificPanel: any | undefined;
  @ViewChildren(EgretNotifications2Component) noti: any;

  public egretThemes: ITheme[] | undefined;
  public layoutConf: any;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public jwtAuth: JwtAuthService
  ) {
  }

  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
  }

  toggleNotific() {
    if (this.notificPanel) {
      this.notificPanel.toggle();
    }
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }
}
