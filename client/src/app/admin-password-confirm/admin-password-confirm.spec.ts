import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordConfirm } from './admin-password-confirm.component';

describe('AdminPasswordConfirm', () => {
  let component: AdminPasswordConfirm;
  let fixture: ComponentFixture<AdminPasswordConfirm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPasswordConfirm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPasswordConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
