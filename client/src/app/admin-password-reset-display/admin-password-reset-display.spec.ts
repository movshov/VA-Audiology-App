import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordDisplay } from './admin-password-reset-display.component';

describe('AdminPasswordDisplay', () => {
  let component: AdminPasswordDisplay;
  let fixture: ComponentFixture<AdminPasswordDisplay>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPasswordDisplay ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPasswordDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
