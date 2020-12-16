import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatedPeopleModalComponent } from './duplicated-people-modal.component';

describe('DuplicatedPeopleModalComponent', () => {
  let component: DuplicatedPeopleModalComponent;
  let fixture: ComponentFixture<DuplicatedPeopleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatedPeopleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatedPeopleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
