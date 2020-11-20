import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LetterFrequencyCount} from '../../interfaces/letter-frequency-count';
import {QuickSortService} from '../../services/quick-sort.service';
import {Person} from '../../models/person';
import {NativeSortService} from '../../services/native-sort.service';
import {FrequencyCountModalService} from './frequency-count-modal.service';

@Component({
  selector: 'app-frequency-count-modal',
  templateUrl: './frequency-count-modal.component.html',
  styleUrls: ['./frequency-count-modal.component.scss']
})
export class FrequencyCountModalComponent implements OnInit {

  @Input() people: Person[];

  public frequencyCount: LetterFrequencyCount[];

  constructor(public activeModal: NgbActiveModal,
              private frequencyCountModalService: FrequencyCountModalService) {
  }

  ngOnInit(): void {
    this.frequencyCount = this.frequencyCountModalService.getSortedFrequencyCount(this.people);
  }

}
