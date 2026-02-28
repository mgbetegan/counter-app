import {inject, Injectable} from '@angular/core';
import {ENVIRONMENT} from '@app/tokens/environnement';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commune, CommuneQuery} from '@app/models/commune.model';
import {HttpQueryParamBuilderService} from '../query-params-builder';
import {ApiResponse, PaginatedResponse} from '@app/models';



@Injectable({
  providedIn: 'root',
})
export class CommuneService {
  readonly environment = inject(ENVIRONMENT)
  private httpClient = inject(HttpClient)
  private paramsBuilder  = inject(HttpQueryParamBuilderService)

  fetchCommunes (query:CommuneQuery): Observable<ApiResponse<PaginatedResponse<Commune>>> {
    return this.httpClient.get<ApiResponse<PaginatedResponse<Commune>>>(`${this.environment.apiBaseUrl}/communes/`,{ params: this.paramsBuilder.build(query) })
  }
}
