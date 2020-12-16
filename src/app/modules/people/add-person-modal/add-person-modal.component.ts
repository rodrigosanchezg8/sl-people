import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../../shared/models/person';

@Component({
  selector: 'app-add-person-modal',
  templateUrl: './add-person-modal.component.html',
  styleUrls: ['./add-person-modal.component.scss']
})
export class AddPersonModalComponent implements OnInit {

  @Input() people: Person[];

  public person: Person = new Person();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }


  /**
   * Save person to current given array of people and close modal
   */
  save(): void {
    this.people.unshift(this.person);
    this.activeModal.close();
  }

}
