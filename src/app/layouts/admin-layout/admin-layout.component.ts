import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { noop, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ThemeService } from '../../shared/services/theme.service';
import { ILayoutConf, LayoutService } from '../../shared/services/layout.service';
import { JwtAuthService } from '../../shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public isModuleLoading = false;
  public scrollConfig = {};

  // tslint:disable-next-line:no-any
  public layoutConf: ILayoutConf = {};
  // tslint:disable-next-line:no-any
  public adminContainerClasses: any = {};
  private moduleLoaderSub: Subscription | undefined;
  private layoutConfSub: Subscription | undefined;
  private readonly routerEventSub: Subscription;

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService
  ) {
    // Check Auth Token is valid
    this.jwtAuth.checkTokenIsValid().subscribe();

    // Close sidenav after route change in mobile

    this.routerEventSub = router.events
      .pipe(
        // @ts-ignore
        filter(event => event instanceof NavigationEnd),
        tap((routeChange: NavigationEnd) => {
          this.layout.adjustLayout({ route: routeChange.url });
          this.scrollToTop();
        })
      )
      .subscribe(noop);
  }

  ngOnInit() {
    // this.layoutConf = this.layout.layoutConf;
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;
      // console.log(this.layoutConf);

      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }


  @HostListener('window:resize', ['$event'])
  // @ts-ignore
  onResize(event) {
    this.layout.adjustLayout(event);
  }

  ngAfterViewInit() {

  }

  scrollToTop() {
    if (document) {
      setTimeout(() => {
        let element;
        if (this.layoutConf.topbarFixed) {
          element = (document.querySelector('#rightside-content-hold') as HTMLElement);
        } else {
          element = (document.querySelector('#main-content-wrap') as HTMLElement);
        }
        element.scrollTop = 0;
      });
    }
  }

  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  sidebarMouseenter() {
    if (this.layoutConf.sidebarStyle === 'compact') {
      this.layout.publishLayoutChange({ sidebarStyle: 'full' });
    }
  }

  sidebarMouseleave() {
    if (
      this.layoutConf.sidebarStyle === 'full' &&
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({ sidebarStyle: 'compact' });
    }
  }

  updateAdminContainerClasses(layoutConf: ILayoutConf) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.navigationPos === 'side',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big' && layoutConf.navigationPos === 'side',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed' && layoutConf.navigationPos === 'side',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed && layoutConf.navigationPos === 'side'
    };
  }

}
