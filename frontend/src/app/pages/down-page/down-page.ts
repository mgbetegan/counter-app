import {Component, inject} from '@angular/core';
import {Counter} from '@app/components/counter/counter';
import {CounterService} from '@app/services/counter/counter';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-down-page',
  imports: [Counter, Button],
  templateUrl: './down-page.html',
  styleUrl: './down-page.scss',
  standalone: true
})
export class DownPage {
  counterService = inject(CounterService)
}
