import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-microfrontends-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  @Input() value;
  @Output() increment: EventEmitter<void> = new EventEmitter<void>();
}
