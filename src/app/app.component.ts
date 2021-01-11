import { Component, OnInit } from '@angular/core';
import { UILibIconService } from './shared/services/ui-lib-icon.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoutePartsService } from './shared/services/route-parts.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'Louvemos';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService
  ) {
    iconService.init();
  }

  ngOnInit() {
    this.changePageTitle();
  }

  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
        .reverse()
        .map((part) => part.title)
        .reduce((partA, partI) => {
          return `${ partA } > ${ partI }`;
        });
      this.pageTitle += ` | ${ this.appTitle }`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
