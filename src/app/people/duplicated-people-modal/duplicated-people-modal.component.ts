import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../models/person';
import {SuggestedDuplicate} from '../../interfaces/suggested-duplicate';
import {DuplicatedPeopleModalService} from './duplicated-people-modal.service';

@Component({
  selector: 'app-duplicated-people-modal',
  templateUrl: './duplicated-people-modal.component.html',
  styleUrls: ['./duplicated-people-modal.component.scss']
})
export class DuplicatedPeopleModalComponent implements OnInit {

  @Input() people: Person[];

  public similarEmails: SuggestedDuplicate[] = [];

  constructor(public activeModal: NgbActiveModal,
              private duplicatedPeopleService: DuplicatedPeopleModalService) {
  }

  ngOnInit(): void {
    this.similarEmails = this.duplicatedPeopleService.getFilteredSuggestions(this.people);
  }

}
