import {Component, inject, OnInit} from '@angular/core';
import {CounterService} from '@app/services/counter/counter';
import {NgClass} from '@angular/common';
import {CommuneService} from '@app/services/commune/commune';
import {lastValueFrom} from 'rxjs';
import {MELUN_POSTAL_CODE_FALLBACK} from '@app/utils/contants';

@Component({
  selector: 'app-counter',
  imports: [
    NgClass
  ],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  standalone: true,
})
export class Counter implements OnInit {
  counterService = inject(CounterService)
  communeService = inject(CommuneService)

  ngOnInit() {
    this.setMelunPostalCodes()
  }

  async setMelunPostalCodes(): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.communeService.fetchCommunes({ name: 'Melun' })
      );

      const raw = response?.data?.items?.[0]?.postal_code;

      if (!raw) {
        this.counterService.melunPostalCodes.set([MELUN_POSTAL_CODE_FALLBACK]);
        return;
      }

      const codes = raw
        .split(',')
        .map((c: string) => parseInt(c.trim(), 10))
        .filter((n: number) => !isNaN(n));

      const melunPostalCodes = codes.length ? codes : [MELUN_POSTAL_CODE_FALLBACK];
      this.counterService.melunPostalCodes.set(melunPostalCodes);

    } catch {
      this.counterService.melunPostalCodes.set([MELUN_POSTAL_CODE_FALLBACK])
    }
  }
}
