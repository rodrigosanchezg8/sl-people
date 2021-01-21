import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PeopleComponent} from './people.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApiInterceptor} from '../../core/interceptors/api.interceptor';
import {PeopleService} from './people.service';
import {Person} from '../../shared/models/person';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let httpTestingController: HttpTestingController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PeopleComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        NgbModule
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    peopleService = TestBed.inject(PeopleService);

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request first people page', () => {
    const initRequest = httpTestingController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/v2/people?per_page=25&page=1'
    });

    expect(initRequest.cancelled).toBeFalsy();
    expect(initRequest.request.responseType).toEqual('json');

    httpTestingController.verify();
  });

  it('should expect first page and be able to navigate', () => {
    httpTestingController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/v2/people?per_page=25&page=1'
    });

    component.fetch(2);
    const secondPageRequest = httpTestingController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/v2/people?per_page=25&page=2'
    });
    expect(secondPageRequest.cancelled).toBeFalsy();
    expect(secondPageRequest.request.responseType).toEqual('json');

    httpTestingController.verify();
  });

  it('should contain opening modal buttons', () => {
    const frequencyCountBtn = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Frequency count'
    );
    expect(frequencyCountBtn).toBeTruthy();

    const duplicatedPeopleBtn = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Duplicated people '
    );
    expect(duplicatedPeopleBtn).toBeTruthy();

    const addPersonBtn = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Add person '
    );
    expect(addPersonBtn).toBeTruthy();
  });

  it('should contain pagination', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.pagination')).toBeTruthy();
  });

});
