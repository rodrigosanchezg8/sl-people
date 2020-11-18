import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickSortService {

  constructor() {
  }

  public sort(array: any[], attribute: string, orderBy: string): any[] {
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
