import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDataModalComponent } from './clear-data-modal.component';

describe('ClearDataModalComponent', () => {
  let component: ClearDataModalComponent;
  let fixture: ComponentFixture<ClearDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
