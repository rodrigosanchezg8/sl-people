import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCount} from '../../interfaces/frequency-count';
import {QuickSortService} from '../../services/quick-sort.service';

@Component({
  selector: 'app-frequency-count-modal',
  templateUrl: './frequency-count-modal.component.html',
  styleUrls: ['./frequency-count-modal.component.scss']
})
export class FrequencyCountModalComponent implements OnInit {

  @Input() people;

  public alphabetCount: FrequencyCount[];
  public alphabetKeys: string[];

  constructor(public activeModal: NgbActiveModal,
              private quickSortService: QuickSortService) {
  }

  ngOnInit(): void {
    const singleEmails: string = this.getSingleEmailsString();
    this.alphabetCount = this.generateAlphabetArray(singleEmails);
    this.alphabetCount = this.quickSortService.sort(this.alphabetCount, 'count', 'DESC');
  }

  private getSingleEmailsString(): string {
    const emails: string[] = this.people.map(p => p.email_address);
    return emails.join('');
  }

  private generateAlphabetArray(fromString): FrequencyCount[] {
    if (!fromString || !fromString.length) {
      return [];
    }

    const alphabet = [];
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

  private nativeSort(): void {
    this.alphabetCount = this.alphabetCount.sort((a: FrequencyCount, b: FrequencyCount) => {
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      }
      return 0;
    });
  }

}
