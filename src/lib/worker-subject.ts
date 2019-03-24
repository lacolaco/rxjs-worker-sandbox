import { Subject, Subscription, ReplaySubject, fromEvent } from 'rxjs';

export class WorkerSubject<T> extends Subject<T> {
  private inner: Subject<T>;
  private sub: Subscription;

  constructor(public worker: Worker) {
    super();
    this.inner = new ReplaySubject();
    this.sub = new Subscription();
    this.sub.add(
      fromEvent<MessageEvent>(worker, 'message').subscribe(ev =>
        this.inner.next(ev.data),
      ),
    );
    this.sub.add(
      fromEvent<ErrorEvent>(worker, 'error').subscribe(ev =>
        this.inner.error(ev.error),
      ),
    );

    this._subscribe = this.inner._subscribe.bind(this.inner);
  }

  next(value: T) {
    this.worker.postMessage(value);
  }

  complete() {
    this.sub.unsubscribe();
    this.inner.complete();
    super.complete();
  }
}
