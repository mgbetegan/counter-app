import {Component, inject} from '@angular/core';
import {Counter} from '../../components/counter/counter';
import {CounterService} from '../../services/counter/counter';

@Component({
  selector: 'app-down-page',
  imports: [Counter],
  templateUrl: './down-page.html',
  styleUrl: './down-page.css',
  standalone: true
})
export class DownPage {
  counterService = inject(CounterService)
}
