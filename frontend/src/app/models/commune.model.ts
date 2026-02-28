import {BasePaginationQuery} from './base-pagination-query.model';

export interface Commune {
  id:string
  name: string;
  postal_code: string;
  insee_code: string;

}

export interface CommuneQuery extends BasePaginationQuery {
  name?: string;
}
