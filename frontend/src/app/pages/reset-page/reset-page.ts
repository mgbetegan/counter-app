import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CounterService} from '@app/services/counter/counter';
import {Button} from 'primeng/button';
import {Counter} from '@app/components/counter/counter';
import {InputText} from 'primeng/inputtext';

import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-reset-page',
  imports: [ReactiveFormsModule, ReactiveFormsModule, Button, Counter, InputText],
  templateUrl: './reset-page.html',
  styleUrl: './reset-page.scss',
  standalone: true,
})
export class ResetPage {
  messageService = inject(MessageService);
  counterService = inject(CounterService);
  resetForm = new FormGroup({
    date: new FormControl('', Validators.required)
  });
  isSubmitted = signal<boolean>(false)

  submitReset(){
    this.isSubmitted.set(true)

    if(!this.resetForm.valid){
      return;
    }

    this.counterService.reset();

    this.resetForm.reset();

    this.messageService.add({severity: 'success', summary: 'Info', detail: 'Counter reset successfully'});
    this.isSubmitted.set(false)
  }
}
