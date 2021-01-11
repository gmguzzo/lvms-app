import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';
import { ILayoutConf, LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: ILayoutConf | undefined;
  menuItems: any;

  menuItemSub: Subscription | undefined;

  egretThemes: any[] = [];

  @Input() notificPanel: any;

  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public jwtAuth: JwtAuthService
  ) {
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$
      // @ts-ignore
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        const limit = 4;
        const mainItems: any[] = res.slice(0, limit);
        if (res.length <= limit) {
          return this.menuItems = mainItems;
        }
        const subItems: any[] = res.slice(limit, res.length - 1);
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        });
        this.menuItems = mainItems;
      });
  }

  ngOnDestroy() {
    if (this.menuItemSub) {
      this.menuItemSub.unsubscribe();
    }
  }

  changeTheme(theme: any) {
    this.layout.publishLayoutChange({ matTheme: theme.name });
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf && this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }
}
