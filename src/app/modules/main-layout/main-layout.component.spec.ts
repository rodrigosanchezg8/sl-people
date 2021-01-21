import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainLayoutComponent} from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', () => {
    const logoImg = fixture.debugElement.query(
      debugEl => debugEl.name === 'img' && debugEl.nativeElement.src.includes('sl-logo')
    );
    expect(logoImg).toBeTruthy();

    const logoText = fixture.debugElement.query(
      debugEl => debugEl.name === 'a' && debugEl.nativeElement.textContent === 'SalesLoft'
    );
    expect(logoText).toBeTruthy();
  });

  it('should contain logout button', () => {
    const logoutBtn = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Logout '
    );
    expect(logoutBtn).toBeTruthy();
  });
});
