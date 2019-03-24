import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WorkerSubject } from '../lib/worker-subject';

@Component({
  selector: 'app-root',
  template: `
    <div>{{ compiled$ | async }}</div>
  `,
})
export class AppComponent implements OnInit {
  compiled$: Subject<string>;

  constructor() {
    this.compiled$ = new WorkerSubject(
      new Worker('./compile-markdown', { type: 'module' }),
    );
  }

  ngOnInit() {
    this.compiled$.next('## foo');
  }
}
