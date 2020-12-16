import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickSortService {

  constructor() {
  }

  /**
   *  Set a pivot.
   *  Have a left and right arrays in which we will push into.
   *  Iterate the array after the pivot.
   *  Lesser elements are pushed to left. This means, if the current element is lesser than the pivot element, push left.
   *  Greater or equals elements are pushed to right. This means, if the current element is greater than the pivot element, push right.
   *  Return an array including the result for the sorted right array elements, the pivot,
   * and the result for the sorted left array elements. Depending on the orderBy ASC/DESC value the arrays are swapped.
   * This happens on recursive levels for smaller arrays until its length is 1. At the end, the array is sorted.
   * @param array Array to sort
   * @param attribute Attribute to sort by
   * @param orderBy Sort by ASC or DESC
   */
  public sort(array: any[], attribute: string, orderBy: string = 'ASC'): any[] {
    if (array.length < 1 || !attribute || !attribute.length) {
      return [];
    }

    const pivot: any = array[0];
    const left: any[] = [];
    const right: any[] = [];

    for (let i = 1; i < array.length; i++) {
      if (array[i][attribute] < pivot[attribute]) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    return orderBy === 'DESC'
      ? [...this.sort(right, attribute, orderBy), pivot, ...this.sort(left, attribute, orderBy)]
      : [...this.sort(left, attribute, orderBy), pivot, ...this.sort(right, attribute, orderBy)];
  }

}
