import {computed,  Injectable, signal} from '@angular/core';
import {BG_DANGER, BG_DEFAULT, BG_SUCCESS} from '@app/utils/contants';


@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counterStoredValue = this.loadCounterFromStorage()
  multiplier = signal<number>(this.counterStoredValue.multiplier);
  counter = signal<number>(this.counterStoredValue.counter);
  actionsCount = signal<number>(this.counterStoredValue.actionsCount);
  melunPostalCodes = signal<number[]>([])

  counterBg = computed(() => {
    if (this.counter() >= 10) {
      return BG_DANGER;
    }
    if (this.counter() <= -10) {
      return BG_SUCCESS
    }
    return BG_DEFAULT;
  });


  increment() {
    this.counter.update(value => value + this.multiplier());
    this.updateActionCount()
    this.updateLocalStorage()
    this.checkMelunReset();

  }

  decrement() {
    this.counter.update(value => value -  this.multiplier());
    this.updateActionCount()
    this.updateLocalStorage()
    this.checkMelunReset()

  }

  checkMelunReset(){
    if(this.melunPostalCodes().includes(this.counter())) {
      this.reset()
    }
  }
  reset() {
    this.counter.set(0);
    this.multiplier.set(1);
    this.actionsCount.set(1);
    this.updateLocalStorage();
  }

  private updateActionCount() {
    this.actionsCount.update(value => value + 1);
    this.applyChanges()
  }

  private applyChanges() {
    if (this.actionsCount() % 30 === 0) {
      this.multiplier.update(value => value * 2);
      //this.counter.update(value => value * 2);
      this.actionsCount.set(1);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('counter', JSON.stringify(this.counter()))
    localStorage.setItem('actionsCount', JSON.stringify(this.actionsCount()))
    localStorage.setItem('multiplier', JSON.stringify(this.multiplier()))
  }

  private loadCounterFromStorage() {
    const counterValue = localStorage.getItem('counter');
    const actionsCountValue = localStorage.getItem('actionsCount');
    const multiplierValue = localStorage.getItem('multiplier');
    const counter = counterValue ? JSON.parse(counterValue) : null;
    const actionsCount = actionsCountValue ? actionsCountValue : 1;
    const multiplier = multiplierValue ? JSON.parse(multiplierValue) : 1;
    return {
      counter: Number(counter),
      actionsCount: Number(actionsCount),
      multiplier: Number(multiplier),
    }
  }




}
