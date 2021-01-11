import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class EgretSidenavHelperService {
  sidenavList: MatSidenav[];

  constructor() {
    this.sidenavList = [];
  }

  setSidenav(id: any, sidenav: MatSidenav): void {
    this.sidenavList[id] = sidenav;
  }

  getSidenav(id: any): any {
    return this.sidenavList[id];
  }
}
