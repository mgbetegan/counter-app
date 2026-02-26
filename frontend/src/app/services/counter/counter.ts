import {Injectable, signal,computed} from '@angular/core';
import {BG_DEFAULT, BG_NEGATIVE, BG_POSITIVE} from '../../utils/contants';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counterStoredValue = this.loadCounterFromStorage()
  counter = signal<number>(this.counterStoredValue.counter);
  actionsCount = signal<number>(this.counterStoredValue.actionsCount);
  counterBg = computed(()=>{
    if(this.counter() >= 10){
      return BG_POSITIVE
    }
    if(this.counter() <= -10){
      return BG_NEGATIVE
    }
    return BG_DEFAULT;
  });


  increment() {
    this.counter.update(value => value + 1);
    this.updateLocalStorage()
    this.updateActionCount()
  }

  decrement() {
    this.counter.update(value => value - 1);
    this.updateLocalStorage()
    this.updateActionCount()
  }

  reset() {
    this.counter.set(0)
  }

  private updateActionCount() {
    this.actionsCount.update(value => value + 1);
    this.applyChanges()
  }

  private applyChanges(){
    if(this.actionsCount() % 30 ===0){
      this.counter.update(value => value *2);
    }
  }

  private updateLocalStorage(){
    localStorage.setItem('counter', JSON.stringify(this.counter()))
    localStorage.setItem('actionsCount', JSON.stringify(this.actionsCount()))
  }

  private loadCounterFromStorage() {
    const counterValue = localStorage.getItem('counter');
    const actionsCountValue = localStorage.getItem('actions_count');
    const counter =  counterValue ? JSON.parse(counterValue) : null;
    const actionsCount = actionsCountValue ? actionsCountValue : 1;

    return {
      counter: Number(counter),
      actionsCount: Number(actionsCount),
    }
  }


}
