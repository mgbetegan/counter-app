export interface PaginatedResponse<T> {
  current_page: string;
  next_page: string | null;
  previous_page: string | null;
  total: number;
  items: T[];
}
