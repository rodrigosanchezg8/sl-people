import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DuplicatedPeopleModalComponent} from './duplicated-people-modal.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../../../core/interceptors/api.interceptor';
import {Person} from '../../../shared/models/person';
import {SuggestedDuplicate} from '../../../shared/interfaces/suggested-duplicate';
import {DuplicatedPeopleModalService} from './duplicated-people-modal.service';

describe('DuplicatedPeopleModalComponent', () => {
  let component: DuplicatedPeopleModalComponent;
  let fixture: ComponentFixture<DuplicatedPeopleModalComponent>;
  let httpTestingController: HttpTestingController;
  let duplicatedPeopleModalService: DuplicatedPeopleModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DuplicatedPeopleModalComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        NgbModalModule
      ],
      providers: [
        NgbActiveModal,
        NgbModal,
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    duplicatedPeopleModalService = TestBed.inject(DuplicatedPeopleModalService);

    fixture = TestBed.createComponent(DuplicatedPeopleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request fetch by 100 on open', () => {
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/v2/people?per_page=100&page=1'
    });

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    httpTestingController.verify();
  });

  it('should suggest duplicated match when similarity', () => {
    const personA = new Person();
    personA.email_address = 'larusso@mails.com';

    const personB = new Person();
    personB.email_address = 'laruso@mails.com';

    const singleSimilarity: SuggestedDuplicate[] =
      duplicatedPeopleModalService.getFilteredSuggestions([personA, personB]);
    expect(singleSimilarity.length).toBe(1);
    expect(singleSimilarity[0].first).toBe('larusso@mails.com');
    expect(singleSimilarity[0].second).toBe('laruso@mails.com');
  });

  it('should not suggest duplicated when difference', () => {
    const personA = new Person();
    personA.email_address = 'difference@mails.com';

    const personB = new Person();
    personB.email_address = 'tree@mails.com';

    const singleSimilarity: SuggestedDuplicate[] =
      duplicatedPeopleModalService.getFilteredSuggestions([personA, personB]);
    expect(singleSimilarity.length).toBe(0);
  });

});
