import {Inject, Injectable} from '@angular/core';
import {LetterFrequencyCount} from '../../interfaces/letter-frequency-count';
import {Person} from '../../models/person';
import {QuickSortService} from '../../services/quick-sort.service';
import {NativeSortService} from '../../services/native-sort.service';

@Injectable({
  providedIn: 'root'
})
export class FrequencyCountModalService {

  constructor(
    private quickSortService: QuickSortService,
    private nativeSortService: NativeSortService) {
  }


  /**
   * Calls concatenateEmails, generateFrequencyCount and quickSortService or nativeSortService to sort the frequency count.
   * @param people List of people
   */
  public getSortedFrequencyCount(people: Person[]): LetterFrequencyCount[] {
    const singleEmails: string = this.concatenateEmails(people);
    if (!singleEmails || !singleEmails.length) {
      return;
    }

    const frequencyCount: LetterFrequencyCount[] = this.generateFrequencyCount(singleEmails);
    return this.quickSortService.sort(frequencyCount, 'count', 'DESC');
  }

  /**
   * By the list of people received, it maps and joins every person by its email address into a string.
   * @param people List of people
   * @private
   */
  private concatenateEmails(people: Person[]): string {
    if (!people || !people.length) {
      return;
    }

    const emails: string[] = people.map(p => p.email_address);
    return emails.join('');
  }

  /**
   * Creates a LetterFrequencyCount array with the count of appearance of each letter.
   * @param fromString string to generate frequency from
   */
  public generateFrequencyCount(fromString: string): LetterFrequencyCount[] {
    if (!fromString || !fromString.length) {
      return [];
    }

    const alphabet: LetterFrequencyCount[] = [];
    for (const letter of fromString) {
      const index = alphabet.findIndex(obj => obj.letter === letter);
      if (index === -1) {
        alphabet.push({letter, count: 1});
      } else {
        alphabet[index].count += 1;
      }
    }

    return alphabet;
  }

}
