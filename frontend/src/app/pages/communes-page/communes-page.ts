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
  ],
  templateUrl: './communes-page.html',
  styleUrls: ['./communes-page.scss'],
})
export class CommunesPage implements OnInit {
  @ViewChild('dt') dt!: Table;
  communes = signal<Commune[]>([]);
  pageSize = signal<number>(50)
  previousPage = signal<string |null>(null)
  nextPage = signal<string | null>(null)
  total = signal<number>(0)
  first = signal(0);
  searchValue = '';
  communesService = inject(CommuneService);


  ngOnInit(): void {
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
      this.pageSize.set(event.rows ?? 50);
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
      const response = await lastValueFrom(this.communesService.fetchCommunes(query))
      this.communes.set(response.data.items)
      this.nextPage.set(response.data.next_page)
      this.previousPage.set(response.data.previous_page)
      this.total.set(response.data.total)
    } catch (_e) {

    }
  }




}
