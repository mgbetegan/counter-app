import { Component,inject } from '@angular/core';
import {CounterService} from '../../services/counter/counter';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [
    NgClass
  ],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  standalone: true,
})
export class Counter {
  counterService = inject(CounterService)
}
