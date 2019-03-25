import gleenlet from 'greenlet';
import { from, Observable } from 'rxjs';
import { concatMap, switchMap, exhaustMap } from 'rxjs/operators';

export function concatMapOnWorker<T, U>(fn: (arg: T) => Promise<U>) {
  const workerized = gleenlet(fn);
  return (source: Observable<T>): Observable<U> => {
    return source.pipe(concatMap(v => from(workerized(v))));
  };
}

export function switchMapOnWorker<T, U>(fn: (arg: T) => Promise<U>) {
  const workerized = gleenlet(fn);
  return (source: Observable<T>): Observable<U> => {
    return source.pipe(switchMap(v => from(workerized(v))));
  };
}

export function exhaustMapOnWorker<T, U>(fn: (arg: T) => Promise<U>) {
  const workerized = gleenlet(fn);
  return (source: Observable<T>): Observable<U> => {
    return source.pipe(exhaustMap(v => from(workerized(v))));
  };
}
