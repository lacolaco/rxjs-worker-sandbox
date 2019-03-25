import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { concatMapOnWorker } from '../lib/mapOnWorker';
import { WorkerSubject } from '../lib/worker-subject';

@Component({
  selector: 'app-root',
  template: `
    <div>{{ compiled$ | async }}</div>
    <div>{{ calculated$ | async }}</div>
  `,
})
export class AppComponent implements OnInit {
  compiled$: Subject<string>;

  calculated$: Observable<any>;

  constructor() {
    this.compiled$ = new WorkerSubject(
      new Worker('./compile-markdown', { type: 'module' }),
    );

    this.calculated$ = interval(1).pipe(
      concatMapOnWorker(async i => Math.sqrt(i)),
    );
  }

  ngOnInit() {
    this.compiled$.next('## foo');
  }
}
