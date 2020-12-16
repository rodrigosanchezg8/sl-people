import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../models/person';
import {SuggestedDuplicate} from '../../interfaces/suggested-duplicate';
import {DuplicatedPeopleModalService} from './duplicated-people-modal.service';
import {PeopleService} from '../people.service';

@Component({
  selector: 'app-duplicated-people-modal',
  templateUrl: './duplicated-people-modal.component.html',
  styleUrls: ['./duplicated-people-modal.component.scss']
})
export class DuplicatedPeopleModalComponent implements OnInit {

  public loading = true;
  public similarEmails: SuggestedDuplicate[] = [];

  constructor(public activeModal: NgbActiveModal,
              private duplicatedPeopleService: DuplicatedPeopleModalService,
              private peopleService: PeopleService) {
  }

  /**
   * Level #3.
   * Fetches all available people and gets similar emails from its own serviceand displays a
   * table with all the duplicated matches.
   */
  async ngOnInit(): Promise<void> {
    await this.peopleService.getAllAvailable();
    this.similarEmails = this.duplicatedPeopleService.getFilteredSuggestions(this.peopleService.allPeople);
    this.loading = false;
  }

}
