import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoreSharedService {
  private incrementationSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  value$: Observable<number> = this.incrementationSubject.asObservable();

  constructor() {
    console.log('New CoreSharedService instance');
  }

  increment() {
    this.incrementationSubject.next(this.incrementationSubject.getValue() + 1);
  }
}
