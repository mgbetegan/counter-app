import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpQueryParamBuilderService {
  build(query: object): HttpParams {
    return new HttpParams({ fromObject: { ...query } });
  }
}
