import {Component, OnInit} from '@angular/core';
import {Person} from '../../shared/models/person';
import {TableState} from '../../shared/interfaces/table-state';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCountModalComponent} from './frequency-count-modal/frequency-count-modal.component';
import {DuplicatedPeopleModalComponent} from './duplicated-people-modal/duplicated-people-modal.component';
import {PeopleService} from './people.service';
import {ToastService} from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public mPeople: Person[] = [];
  public tableState: TableState = {
    columns: ['Name', 'Email address', 'Job title'],
    loading: true,
    rows: 25,
    page: 1,
    size: 25
  };

  constructor(private modalService: NgbModal,
              public peopleService: PeopleService,
              public toastService: ToastService) {
  }


  ngOnInit(): void {
    this.fetch(this.tableState.page);
  }

  /**
   * Level #1. Fetches the list of people from the API using the PeopleService and catches errors. If all people were
   * previously loaded, no requests are made.
   * The tableState properties are handled in order for pagination to show correctly.
   */
  async fetch(page: number): Promise<void> {
    try {

      const allPeopleWasLoaded: boolean = this.peopleService.people.length &&
        this.mPeople.length === this.peopleService.people.length;
      if (allPeopleWasLoaded) {
        this.tableState.size = this.mPeople.length;
        return;
      }

      this.tableState.loading = true;

      if (this.peopleService.people.length) {
        this.mPeople = this.peopleService.people;
      } else {
        this.mPeople = await this.peopleService.findAll({
          per_page: this.tableState.rows,
          page
        }).toPromise();

        this.tableState.size = this.mPeople.length === this.tableState.rows
          ? (page + 1) * this.tableState.rows : page * this.tableState.rows;
      }

      this.tableState.loading = false;
    } catch (e) {
      this.tableState.loading = false;
      this.toastService.showError(e.message);
    }
  }

  /**
   * Handle the opening of FrequencyCountModalComponent in a modal.
   */
  openFrequencyCountModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(FrequencyCountModalComponent);
    this.refreshAfterModalResult(modalRef);
  }

  /**
   * Handle the opening of DuplicatedPeopleModalComponent in a modal
   */
  openDuplicatedPeopleModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(DuplicatedPeopleModalComponent);
    this.refreshAfterModalResult(modalRef);
  }

  /**
   * Handle the result of DuplicatedPeopleModalComponent.
   * People array gets updated from singleton data and so does the table size.
   * @param modalRef reference of the modal
   */
  async refreshAfterModalResult(modalRef: NgbModalRef): Promise<void> {
    if (!modalRef) {
      throw new Error('PeopleComponent:refreshAfterModalResult no modal reference provided.');
    }

    try {
      await modalRef.result;
      this.mPeople = this.peopleService.people;
      this.tableState.size = this.mPeople.length;
    } catch (e) {
      this.mPeople = this.peopleService.people;
      this.tableState.size = this.mPeople.length;
    }
  }

  /**
   * Returns the current array of people.
   * If it has been lazy loaded, it returns the same array of people.
   * If the whole list of people has been loaded previously, it slices according to the page and rows for the correct result
   * and returns a new array of it for a new verification.
   */
  sliceByPage(): Person[] {
    if (this.mPeople.length <= this.tableState.rows) {
      return this.mPeople;
    }

    return [...this.mPeople.slice((this.tableState.page - 1) * this.tableState.rows, this.tableState.page * this.tableState.rows)];
  }

}
