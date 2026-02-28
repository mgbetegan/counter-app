import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CounterService} from '@app/services/counter/counter';


@Component({
  selector: 'app-reset-page',
  imports: [ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './reset-page.html',
  styleUrl: './reset-page.scss',
  standalone: true,
})
export class ResetPage {
  counterService = inject(CounterService);
  resetForm = new FormGroup({
    date: new FormControl('', Validators.required)
  });

  submitReset(){
    alert('Form submitted')
    this.counterService.reset();
    this.resetForm.reset()
  }
}
