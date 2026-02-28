import { Component,inject } from '@angular/core';
import {Counter} from '@app/components/counter/counter';
import {CounterService} from '@app/services/counter/counter';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-up-page',
  imports: [Counter, Button],
  templateUrl: './up-page.html',
  styleUrl: './up-page.css',
  standalone: true
})
export class UpPage {
  counterService = inject(CounterService);
}
