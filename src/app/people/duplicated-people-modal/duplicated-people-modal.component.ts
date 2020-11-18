import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../models/person';
import {SuggestedDuplicate} from '../../interfaces/suggested-duplicate';

@Component({
  selector: 'app-duplicated-people-modal',
  templateUrl: './duplicated-people-modal.component.html',
  styleUrls: ['./duplicated-people-modal.component.scss']
})
export class DuplicatedPeopleModalComponent implements OnInit {

  @Input() people: Person[];

  public similarEmails: SuggestedDuplicate[] = [];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.filterPossibleDuplicates();
  }

  filterPossibleDuplicates(): void {
    for (const person of this.people) {
      for (const secondPerson of this.people) {
        if (person === secondPerson) {
          continue;
        }

        const maxDiffs = 1;
        const editsAway = this.editsDifferences(person.email_address, secondPerson.email_address, maxDiffs);
        if (editsAway) {
          const isIncluded = this.similarEmails.some((sd: SuggestedDuplicate) =>
            sd.first === secondPerson.email_address && sd.second === person.email_address);
          if (!isIncluded) {
            this.similarEmails.push({first: person.email_address, second: secondPerson.email_address});
          }
        }
      }
    }
  }

  editsDifferences(first: string, second: string, maxDiffs: number = 1): boolean {
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
