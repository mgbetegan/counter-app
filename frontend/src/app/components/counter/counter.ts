import { Component,inject } from '@angular/core';
import {CounterService} from '../../services/counter/counter';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
  standalone: true,
})
export class Counter {
  counterService = inject(CounterService)
}
