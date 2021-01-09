import { Directive, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EgretSidenavHelperService } from './egret-sidenav-helper.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';
import { MatchMediaService } from '../../services/match-media.service';

@Directive({
  selector: '[egretSidenavHelper]'
})
export class EgretSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.is-open')
  isOpen: boolean;

  @Input('egretSidenavHelper')
  id: string | undefined;

  // tslint:disable-next-line:no-input-rename
  @Input('isOpen')
  isOpenBreakpoint: string | undefined;

  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private egretSidenavHelperService: EgretSidenavHelperService,
    private matSidenav: MatSidenav,
    private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.egretSidenavHelperService.setSidenav(this.id, this.matSidenav);

    this.init();
    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.init();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  init() {
    if (this.isOpenBreakpoint && this.mediaObserver.isActive(this.isOpenBreakpoint)) {
      this.isOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    } else {
      this.isOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }
  }
}

@Directive({
  selector: '[egretSidenavToggler]'
})
export class EgretSidenavTogglerDirective {
  @Input('egretSidenavToggler')
  public id: any;

  constructor(private egretSidenavHelperService: EgretSidenavHelperService) {
  }

  @HostListener('click')
  onClick() {
    this.egretSidenavHelperService.getSidenav(this.id).toggle();
  }
}
