import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrequencyCountModalComponent} from './frequency-count-modal.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Person} from '../../../shared/models/person';
import {LetterFrequencyCount} from '../../../shared/interfaces/letter-frequency-count';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../../../core/interceptors/api.interceptor';
import {FrequencyCountModalService} from './frequency-count-modal.service';

describe('FrequencyCountModalComponent', () => {
  let component: FrequencyCountModalComponent;
  let fixture: ComponentFixture<FrequencyCountModalComponent>;
  let httpTestingController: HttpTestingController;
  let frequencyCountModalService: FrequencyCountModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FrequencyCountModalComponent
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
    frequencyCountModalService = TestBed.inject(FrequencyCountModalService);

    fixture = TestBed.createComponent(FrequencyCountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * The correct frequency is the following
   * c: 14
   * b: 10
   * a: 9
   * o: 6
   * @: 3
   * .: 3
   * m: 3
   * e: 3
   */
  it('should get correct sorted frequency email count', () => {
    const personA = new Person();
    personA.email_address = 'aaabbccc@co.com';

    const personB = new Person();
    personB.email_address = 'bbbbcccaaa@co.com';

    const personC = new Person();
    personC.email_address = 'aaaccbbbbeee@co.com';

    const frequency: LetterFrequencyCount[] = frequencyCountModalService
      .getSortedFrequencyCount([personA, personB, personC]);

    const aFrequency = frequency.find(f => f.letter === 'a');
    const bFrequency = frequency.find(f => f.letter === 'b');
    const cFrequency = frequency.find(f => f.letter === 'c');
    const oFrequency = frequency.find(f => f.letter === 'o');
    const atFrequency = frequency.find(f => f.letter === '@');
    const dotFrequency = frequency.find(f => f.letter === '.');
    const mFrequency = frequency.find(f => f.letter === 'm');
    const eFrequency = frequency.find(f => f.letter === 'e');

    expect(cFrequency).toBeTruthy();
    expect(cFrequency.count).toBe(14);
    expect(cFrequency.count).toBeGreaterThan(bFrequency.count);

    expect(bFrequency).toBeTruthy();
    expect(bFrequency.count).toBe(10);
    expect(bFrequency.count).toBeGreaterThan(aFrequency.count);

    expect(aFrequency).toBeTruthy();
    expect(aFrequency.count).toBe(9);
    expect(aFrequency.count).toBeGreaterThan(oFrequency.count);

    expect(oFrequency).toBeTruthy();
    expect(oFrequency.count).toBe(6);
    expect(oFrequency.count).toBeGreaterThan(atFrequency.count);

    expect(atFrequency).toBeTruthy();
    expect(atFrequency.count).toBe(3);

    expect(dotFrequency).toBeTruthy();
    expect(dotFrequency.count).toBe(3);

    expect(mFrequency).toBeTruthy();
    expect(mFrequency.count).toBe(3);

    expect(eFrequency).toBeTruthy();
    expect(eFrequency.count).toBe(3);
  });

});
