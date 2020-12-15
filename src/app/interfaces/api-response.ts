/**
 * Used to catch the response from any request matching all the keys within the object received.
 */
export interface APIResponse {
  data: any[] | any;
  metadata: {
    filtering: any,
    paging: {
      per_page: number,
      current_page: number,
      next_page: number,
      prev_page: number
    }
    sorting: {
      sort_by: string,
      sort_direction: string
    }
  };
}
