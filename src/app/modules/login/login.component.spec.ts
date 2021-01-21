import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const routes: Routes = [
    {path: '', component: LoginComponent}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(routes)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain login elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.home-container .card').textContent).toContain('Login');
    expect(compiled.querySelector('.home-container .card input[name=username]')).toBeTruthy();
    expect(compiled.querySelector('.home-container .card input[name=password]')).toBeTruthy();
    expect(compiled.querySelector('.home-container .card .btn.btn-primary').textContent).toContain('Sign in');
  });

});
