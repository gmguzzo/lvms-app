import { ChangeDetectorRef, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as hl from 'highlight.js';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.hljs]': 'true',
    '[innerHTML]': 'highlightedCode'
  },
  selector: '[egretHighlight]'
})
export class EgretHighlightDirective implements OnInit, OnChanges, OnDestroy {
  // Inner highlighted html
  highlightedCode = '';
  @Input() path = '';
  @Input('egretHighlight') code = '';
  @Input() languages: string[] = [];
  private unsubscribeAll: Subject<any>;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private _zone: NgZone,
    private http: HttpClient
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    if (this.code) {
      this.highlightElement(this.code);
    }
    if (this.path) {
      this.highlightedCode = 'Loading...';
      this.http
        .get(this.path, { responseType: 'text' })
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(response => {
          this.highlightElement(response, this.languages);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['code'] &&
      changes['code'].currentValue &&
      changes['code'].currentValue !== changes['code'].previousValue
    ) {
      this.highlightElement(this.code);
      // console.log('hljs on change', changes)
    }
  }

  highlightElement(code: string, languages?: string[]) {
    this._zone.runOutsideAngular(() => {
      const res = hl.highlightAuto(code);
      this.highlightedCode = res.value;
    });
  }
}
