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

  public getSortedFrequencyCount(people: Person[]): LetterFrequencyCount[] {
    const singleEmails: string = this.concatenateEmails(people);
    if (!singleEmails || !singleEmails.length) {
      return;
    }

    const frequencyCount: LetterFrequencyCount[] = this.generateFrequencyCount(singleEmails);
    return this.quickSortService.sort(frequencyCount, 'count', 'DESC');
  }

  private concatenateEmails(people: Person[]): string {
    if (!people || !people.length) {
      return;
    }

    const emails: string[] = people.map(p => p.email_address);
    return emails.join('');
  }

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
