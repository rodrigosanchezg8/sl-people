/**
 * For every table used.
 */
export interface TableState {
  columns: string[];
  loading: boolean;
  rows: number;
  page: number;
  size: number;
}
