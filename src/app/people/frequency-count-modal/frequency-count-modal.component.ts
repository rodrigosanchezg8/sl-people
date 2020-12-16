import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LetterFrequencyCount} from '../../interfaces/letter-frequency-count';
import {Person} from '../../models/person';
import {FrequencyCountModalService} from './frequency-count-modal.service';
import {PeopleService} from '../people.service';

@Component({
  selector: 'app-frequency-count-modal',
  templateUrl: './frequency-count-modal.component.html',
  styleUrls: ['./frequency-count-modal.component.scss']
})
export class FrequencyCountModalComponent implements OnInit {

  public loading = true;
  public frequencyCount: LetterFrequencyCount[];

  constructor(public activeModal: NgbActiveModal,
              private frequencyCountModalService: FrequencyCountModalService,
              private peopleService: PeopleService) {
  }

  /**
   * Level #2
   * Fetches all available people and gets sorted frequency count data from its service to present in the table.
   */
  async ngOnInit(): Promise<void> {
    await this.peopleService.getAllAvailable();
    this.frequencyCount = this.frequencyCountModalService.getSortedFrequencyCount(this.peopleService.allPeople);
    this.loading = false;
  }

}
