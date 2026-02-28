import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Table, TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {ProgressBarModule} from 'primeng/progressbar';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CommuneService} from '@app/services/commune/commune';
import {lastValueFrom} from 'rxjs';
import {Commune, CommuneQuery} from '@app/models/commune.model';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'app-communes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    ProgressBarModule,
    IconFieldModule,
    InputIconModule,
    AutoComplete,
    Paginator,
    Skeleton,
  ],
  templateUrl: './communes-page.html',
  styleUrls: ['./communes-page.scss'],
})
export class CommunesPage implements OnInit {
  @ViewChild('dt') dt!: Table;
  communes = signal<Commune[]>([]);
  pageSize = signal<number>(30)
  previousPage = signal<string |null>(null)
  nextPage = signal<string | null>(null)
  total = signal<number>(0)
  first = signal(0);
  isLoading = signal<boolean>(false);
  skeletonRows = Array(this.pageSize()).fill({});
  searchValue = '';
  communesService = inject(CommuneService);


   ngOnInit() {
    this.getCommunes();
  }

  async onSearch(event: AutoCompleteCompleteEvent) {
    this.searchValue = event.query;
    await this.getCommunes({name: event.query, size: this.pageSize()});
  }

  async onClear() {
    this.searchValue = '';
    await this.getCommunes();
  }

  async onPageChange(event: PaginatorState) {
    const newFirst = event.first ?? 0;
    const direction = newFirst > this.first() ? 'next' : 'prev';
    this.first.set(newFirst);

    if (event.rows !== this.pageSize()) {
      this.pageSize.set(event.rows ?? 30);
      this.first.set(0);
      await this.getCommunes()
      return;
    }

    if (direction === 'next') {
     await this.getCommunes({name: this.searchValue, size: this.pageSize(), cursor: this.nextPage() ?? undefined});
    } else {
      await this.getCommunes({name: this.searchValue, size: this.pageSize(), cursor: this.previousPage() ?? undefined});
    }
  }

  async getCommunes(query: CommuneQuery = {size: this.pageSize()}) {
    try {
      this.isLoading.set(true);
      const response = await lastValueFrom(this.communesService.fetchCommunes(query))
      this.communes.set(response.data.items)
      this.nextPage.set(response.data.next_page)
      this.previousPage.set(response.data.previous_page)
      this.total.set(response.data.total)
      this.isLoading.set(false)
    } catch (_e) {
      this.isLoading.set(false);
    }
  }




}
