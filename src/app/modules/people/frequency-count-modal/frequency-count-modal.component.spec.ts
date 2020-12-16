import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyCountModalComponent } from './frequency-count-modal.component';

describe('FrequencyCountModalComponent', () => {
  let component: FrequencyCountModalComponent;
  let fixture: ComponentFixture<FrequencyCountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyCountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyCountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
