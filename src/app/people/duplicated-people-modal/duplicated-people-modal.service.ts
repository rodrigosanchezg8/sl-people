import {Injectable} from '@angular/core';
import {SuggestedDuplicate} from '../../interfaces/suggested-duplicate';
import {Person} from '../../models/person';

@Injectable({
  providedIn: 'root'
})
export class DuplicatedPeopleModalService {

  constructor() {
  }

  public getFilteredSuggestions(people: Person[]): SuggestedDuplicate[] {
    if (!people || !people.length) {
      return [];
    }

    const similarEmails: SuggestedDuplicate[] = [];
    for (const person of people) {
      for (const secondPerson of people) {
        if (person === secondPerson) {
          continue;
        }

        const maxDiffs = 1;
        const editsAway: boolean = this.hasMaxEditsDifference(person.email_address, secondPerson.email_address, maxDiffs);
        if (editsAway) {
          const isIncluded: boolean = similarEmails.some((sd: SuggestedDuplicate) =>
            sd.first === secondPerson.email_address && sd.second === person.email_address);
          if (!isIncluded) {
            similarEmails.push({first: person.email_address, second: secondPerson.email_address});
          }
        }
      }
    }

    return similarEmails;
  }

  private hasMaxEditsDifference(first: string, second: string, maxDiffs: number = 1): boolean {
    if ((Math.abs(first.length - second.length) > maxDiffs) || !first || !second) {
      return false;
    }

    const longer: string = first.length > second.length ? first : second;
    const shorter: string = second.length < first.length ? second : first;

    let shorterIndex = 0;
    let longerIndex = 0;
    let diffsCount = 0;

    while (shorterIndex < shorter.length && longerIndex < longer.length) {
      if (shorter[shorterIndex] !== longer[longerIndex]) {
        if (diffsCount > maxDiffs) {
          return false;
        }

        diffsCount++;
      } else {
        shorterIndex++;
      }

      longerIndex++;
    }

    return true;
  }
}
