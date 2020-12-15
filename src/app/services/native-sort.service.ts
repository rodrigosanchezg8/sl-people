import {Injectable} from '@angular/core';
import {LetterFrequencyCount} from '../interfaces/letter-frequency-count';

@Injectable({
  providedIn: 'root'
})
export class NativeSortService {

  constructor() {
  }

  /**
   * Simple service that sorts using the native JS sort method.
   * @param array Array to sort
   * @param attribute Attribute to sort by
   * @param orderBy Sort by ASC or DESC
   */
  public sort(array: any[], attribute: string, orderBy = 'ASC'): any[] {
    if (!array || !array.length || !attribute || !attribute.length) {
      return;
    }

    return array.sort((a: LetterFrequencyCount, b: LetterFrequencyCount) => {
      if (a[attribute] > b[attribute]) {
        return orderBy === 'DESC' ? -1 : 1;
      } else if (a[attribute] < b[attribute]) {
        return orderBy === 'DESC' ? 1 : -1;
      }
      return 0;
    });
  }

}
