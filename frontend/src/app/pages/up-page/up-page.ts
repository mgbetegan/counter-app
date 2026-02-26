import { Component,inject } from '@angular/core';
import {Counter} from '../../components/counter/counter';
import {CounterService} from '../../services/counter/counter';


@Component({
  selector: 'app-up-page',
  imports: [Counter],
  templateUrl: './up-page.html',
  styleUrl: './up-page.css',
  standalone: true
})
export class UpPage {
  counterService = inject(CounterService);
}
