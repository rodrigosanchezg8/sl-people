import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPersonModalComponent} from './add-person-modal.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

describe('AddPersonModalComponent', () => {
  let component: AddPersonModalComponent;
  let fixture: ComponentFixture<AddPersonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddPersonModalComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        NgbModalModule
      ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show errors and disable save button', () => {
    const compiled = fixture.nativeElement;

    const firstName = compiled.querySelector('input[name=first-name]');
    const lastName = compiled.querySelector('input[name=last-name]');
    const emailAddress = compiled.querySelector('input[name=email-address]');
    const title = compiled.querySelector('input[name=title]');

    writeInput(firstName, 'S');
    expect(firstName).toHaveClass('ng-invalid');

    writeInput(lastName, 'K');
    expect(lastName).toHaveClass('ng-invalid');

    writeInput(emailAddress, 'P');
    expect(emailAddress).toHaveClass('ng-invalid');

    writeInput(title, 'A');
    expect(title).toHaveClass('ng-invalid');

    expect(compiled.querySelector('button.btn-success').disabled).toBeTruthy();
  });

  it('should save a new person', () => {
    const compiled = fixture.nativeElement;

    const firstName = compiled.querySelector('input[name=first-name]');
    const lastName = compiled.querySelector('input[name=last-name]');
    const emailAddress = compiled.querySelector('input[name=email-address]');
    const title = compiled.querySelector('input[name=title]');

    writeInput(firstName, 'Stephen');
    expect(firstName).toHaveClass('ng-valid');

    writeInput(lastName, 'King');
    expect(lastName).toHaveClass('ng-valid');

    writeInput(emailAddress, 'publish@book.com');
    expect(emailAddress).toHaveClass('ng-valid');

    writeInput(title, 'Author');
    expect(title).toHaveClass('ng-valid');

    expect(compiled.querySelector('button.btn-success').disabled).toBeFalsy();

    component.people = [];
    component.save();
  });

  function writeInput(inputElement: any, text: string): Promise<any> {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

});
