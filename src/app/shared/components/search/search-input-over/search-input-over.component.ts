import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'egret-search-input-over',
  templateUrl: './search-input-over.component.html',
  styleUrls: ['./search-input-over.component.scss']
})
export class SearchInputOverComponent implements OnInit, OnDestroy {
  isOpen = false;
  // tslint:disable-next-line:no-input-rename
  @Input('resultPage') resultPage = '';

  // tslint:disable-next-line:no-input-rename
  @Input('placeholder') placeholder = 'Search here';

  // tslint:disable-next-line:no-input-rename
  @Output('search') search = new EventEmitter();
  searchCtrl = new FormControl();
  searchCtrlSub: Subscription | undefined;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(debounceTime(200))
      .subscribe(value => {
        this.search.emit(value);
        this.searchService.searchTerm.next(value);
      });
  }

  ngOnDestroy() {
    if (this.searchCtrlSub) {
      this.searchCtrlSub.unsubscribe();
    }
  }

  navigateToResult() {
    if (this.resultPage) {
      this.router.navigateByUrl(this.resultPage);
    }
  }

  open() {
    this.isOpen = true;
    this.navigateToResult();
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
